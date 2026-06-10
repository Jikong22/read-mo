import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://www.ebsi.co.kr";
const DOWNLOAD_URL_PREFIX = "https://wdown.ebsi.co.kr/W61001/01exam";
const DOWNLOAD_DIR = path.resolve("downloads");

const GRADE_CONFIG: Record<string, { targetCd: string }> = {
  high1: { targetCd: "D100" },
  high2: { targetCd: "D200" },
  high3: { targetCd: "D300" },
};

// 학년도별 시험 월: 학평(03, 07, 10), 6월모평(06), 9월모평(09), 수능(11)
const TARGET_YEARS = [2021, 2022, 2023, 2024, 2025, 2026];
const MONTHS = ["03", "06", "09", "11"];
const PUBLISHERS: Record<string, string> = { "03": "학평", "06": "6월모평", "09": "9월모평", "11": "수능" };

interface PaperInfo {
  grade: string;
  year: number;
  month: string;
  imgUrl: string;
  type: "mun" | "hae";
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function login(page: any, id: string, pw: string) {
  console.log("� 로그인 중...");
  await page.goto(`${BASE_URL}/ebs/pot/potl/login.ebs?destination=${encodeURIComponent("/ebs/xip/xipc/previousPaperList.ebs?targetCd=D300")}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.locator("input[name='i']").fill(id);
  await page.locator("input[name='c']").fill(pw);
  await page.locator("#btnLogin").click();
  await page.waitForTimeout(5000);
  if (page.url().includes("login")) throw new Error("로그인 실패");
  console.log("✅ 로그인 성공");
  await page.waitForTimeout(2000);
}

async function searchAndExtract(page: any, grade: string, year: number, month: string): Promise<PaperInfo[]> {
  const config = GRADE_CONFIG[grade];
  console.log(`\n📥 [${grade}] ${year}년 ${month}월 ${PUBLISHERS[month] || month} 검색 중...`);

  await page.goto(`${BASE_URL}/ebs/xip/xipc/previousPaperList.ebs?targetCd=${config.targetCd}`, { waitUntil: "networkidle", timeout: 15000 });
  await page.waitForTimeout(1000);

  // Set filters
  await page.evaluate(
    ({ year, month }) => {
      // Uncheck yearAll/monthAll (overrides individual selections)
      const ya = document.querySelector<HTMLInputElement>('input[name="yearAll"]');
      if (ya) ya.checked = false;
      const ma = document.querySelector<HTMLInputElement>('input[name="monthAll"]');
      if (ma) ma.checked = false;

      // Uncheck all year boxes, check target year
      document.querySelectorAll<HTMLInputElement>('input[name="year"]').forEach(cb => cb.checked = false);
      const yCb = document.querySelector<HTMLInputElement>(`input[name="year"][value="${year}"]`);
      if (yCb) yCb.checked = true;

      // Uncheck all month boxes, check target month (try padded then unpadded)
      document.querySelectorAll<HTMLInputElement>('input[name="month"]').forEach(cb => cb.checked = false);
      let mCb = document.querySelector<HTMLInputElement>(`input[name="month"][value="${month}"]`);
      if (!mCb) mCb = document.querySelector<HTMLInputElement>(`input[name="month"][value="${parseInt(month)}"]`);
      if (mCb) mCb.checked = true;

      // Uncheck all subject boxes, check only English
      document.querySelectorAll<HTMLInputElement>('input[name^="sFormPart"]').forEach(cb => cb.checked = false);
      const eCb = document.querySelector<HTMLInputElement>('input[name="sFormPartEng"]');
      if (eCb) eCb.checked = true;

      return { yearFound: !!yCb, monthFound: !!mCb, engFound: !!eCb };
    },
    { year: year.toString(), month }
  );

  // Call search()
  await page.evaluate(() => { if (typeof (window as any).search === "function") (window as any).search(); });
  await page.waitForTimeout(3000);

  // Extract full onclick args
  const papers: PaperInfo[] = await page.evaluate(() => {
    const results: PaperInfo[] = [];
    const btns = document.querySelectorAll("button");
    for (const btn of btns) {
      const text = btn.textContent?.trim();
      const onclick = btn.getAttribute("onclick") || "";
      // Match goDownLoadP('imgUrl', ...) — mun (problem paper)
      const pMatch = onclick.match(/goDownLoadP\s*\(\s*'([^']+)'/);
      if (text === "문제" && pMatch) {
        results.push({ grade: "", year: 0, month: "", imgUrl: pMatch[1], type: "mun" });
      }
      // Match goDownLoadH('imgUrl', ...) — hae (answer key)
      const hMatch = onclick.match(/goDownLoadH\s*\(\s*'([^']+)'/);
      if (text === "해설" && hMatch) {
        results.push({ grade: "", year: 0, month: "", imgUrl: hMatch[1], type: "hae" });
      }
    }
    return results;
  });

  // Assign metadata
  const typeLabel = (t: "mun" | "hae") => t === "mun" ? "문제지" : "정답해설";
  if (papers.length > 0) {
    papers.forEach(p => { p.grade = grade; p.year = year; p.month = month; });
    console.log(`  📎 ${papers.length}개 발견`);
    for (const p of papers) {
      console.log(`     ${typeLabel(p.type)}: ${DOWNLOAD_URL_PREFIX}${p.imgUrl}`);
    }
  } else {
    console.log("  ⏭️  없음");
  }

  return papers;
}

async function downloadPaper(page: any, paper: PaperInfo, saveDir: string): Promise<boolean> {
  const typeLabel = paper.type === "mun" ? "문제지" : "정답해설";
  const url = DOWNLOAD_URL_PREFIX + paper.imgUrl;
  const fileName = path.basename(paper.imgUrl);
  const savePath = path.join(saveDir, fileName);

  if (fs.existsSync(savePath)) {
    console.log(`     ✅ 이미 있음: ${fileName}`);
    return true;
  }

  console.log(`     ⬇️  ${typeLabel} 다운로드 중...`);

  // Try downloading via browser context's request with session cookies
  const response = await page.context().request.get(url, {
    headers: { Referer: BASE_URL + "/ebs/xip/xipc/previousPaperList.ebs" },
  });

  if (response.ok()) {
    const buffer = await response.body();
    fs.writeFileSync(savePath, buffer);
    const mb = (buffer.length / 1024 / 1024).toFixed(2);
    console.log(`     ✅ 저장 완료 (${mb}MB): ${fileName}`);
    return true;
  } else {
    console.log(`     ❌ HTTP ${response.status()} — ${response.statusText()}`);

    // Fallback: try via window.open in browser
    console.log(`     🔄 대체 방법 시도: window.open...`);
    const popup = await page.context().waitForEvent("page", { timeout: 10000 }).catch(() => null);
    await page.evaluate((url) => {
      window.open(url, "_blank");
    }, url);
    await page.waitForTimeout(5000);

    if (popup) {
      try {
        const popupResponse = await popup.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => null);
        if (popupResponse) {
          await popup.waitForTimeout(2000);
          // Try saving the content
          const content = await popup.content().catch(() => "");
          if (content.includes("%PDF")) {
            const buf = Buffer.from(content, "binary");
            fs.writeFileSync(savePath, buf);
            console.log(`     ✅ 팝업 저장 완료: ${fileName}`);
            return true;
          }
        }
      } finally {
        await popup.close().catch(() => {});
      }
    }

    return false;
  }
}

async function main() {
  const id = process.env.EBSI_ID;
  const pw = process.env.EBSI_PW;
  if (!id || !pw) { console.error("❌ EBSI_ID, EBSI_PW 필요"); process.exit(1); }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  let success = 0;
  let fail = 0;

  try {
    await login(page, id, pw);

    for (const grade of Object.keys(GRADE_CONFIG)) {
      for (const year of TARGET_YEARS) {
        for (const month of MONTHS) {
          const papers = await searchAndExtract(page, grade, year, month);
          if (papers.length === 0) continue;

          const saveDir = path.join(DOWNLOAD_DIR, grade, `${year}_${month}`);
          ensureDir(saveDir);

          for (const paper of papers) {
            const ok = await downloadPaper(page, paper, saveDir);
            if (ok) success++; else fail++;
          }
        }
      }
    }
  } catch (err) {
    console.error("❌ 오류:", err);
  } finally {
    console.log(`\n📊 결과: 성공 ${success}, 실패 ${fail}`);
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

main();
