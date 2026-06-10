import { chromium } from "playwright";

async function debug() {
  const id = process.env.EBSI_ID;
  const pw = process.env.EBSI_PW;
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Login
  await page.goto("https://www.ebsi.co.kr/ebs/pot/potl/login.ebs?destination=/ebs/xip/xipc/previousPaperList.ebs%3FtargetCd%3DD300", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.locator("input[name='i']").fill(id);
  await page.locator("input[name='c']").fill(pw);
  await page.locator("#btnLogin").click();
  await page.waitForTimeout(5000);
  if (page.url().includes("login")) { console.log("❌ 로그인 실패"); await browser.close(); return; }

  // Go to 고3 (D300) and check current results (without any filter)
  await page.goto("https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperList.ebs?targetCd=D300", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // Get page text to see what's showing
  const text = await page.locator("body").innerText();
  const lines = text.split("\n").filter(l => l.trim());
  console.log("=== PAGE TEXT (filtered) ===");
  lines.forEach((l, i) => {
    if (l.includes("2026") || l.includes("고3") || l.includes("영어") || l.includes("문제") || l.includes("검색") || l.includes("해설") || l.includes("펼치기") || l.includes("전체") || l.includes("초기화")) {
      console.log(`  ${i}: ${l.trim()}`);
    }
  });

  // Get the goDownLoadP function source
  const funcSrc = await page.evaluate(() => {
    const w = window as any;
    const results: Record<string, string> = {};
    for (const key of ["goDownLoadP", "goDownLoadJ", "goDownLoadH", "search"]) {
      if (typeof w[key] === "function") results[key] = w[key].toString().substring(0, 1000);
    }
    return results;
  });
  
  console.log("\n=== FUNCTION SOURCES ===");
  for (const [name, src] of Object.entries(funcSrc)) {
    console.log(`\n--- ${name} ---`);
    console.log(src);
  }

  await new Promise(r => setTimeout(r, 30000));
  await browser.close();
}

debug();
