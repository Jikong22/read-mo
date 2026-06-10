import { chromium } from "playwright";

async function testDirectFilter() {
  const id = process.env.EBSI_ID;
  const pw = process.env.EBSI_PW;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  try {
    // Login
    await page.goto("https://www.ebsi.co.kr/ebs/pot/potl/login.ebs?destination=/ebs/xip/xipc/previousPaperList.ebs%3FtargetCd%3DD300", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    await page.locator("input[name='i']").fill(id);
    await page.locator("input[name='c']").fill(pw);
    await page.locator("#btnLogin").click();
    await page.waitForTimeout(5000);
    if (page.url().includes("login")) { console.log("❌ 로그인 실패"); return; }

    // Go to 고1
    await page.goto("https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperList.ebs?targetCd=D100", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // Check if sFormPartEng exists in DOM
    const hasEnglishCheckbox = await page.evaluate(() => {
      const cb = document.querySelector('input[name="sFormPartEng"][value="80003"]');
      if (cb) {
        return {
          exists: true,
          parentHTML: cb.parentElement?.outerHTML?.substring(0, 300),
          visible: cb.checkVisibility(),
          offsetParent: (cb as HTMLElement).offsetParent !== null,
        };
      }
      // Search for any element mentioning English
      const allInputs = document.querySelectorAll('input[name^="sFormPart"]');
      const results: any[] = [];
      allInputs.forEach(el => {
        results.push({
          name: el.getAttribute('name'),
          value: el.getAttribute('value'),
          parentText: el.parentElement?.textContent?.trim().substring(0, 50),
          hidden: el.getAttribute('type') === 'hidden',
        });
      });
      return { exists: false, inputs: results };
    });

    console.log("English checkbox check:", JSON.stringify(hasEnglishCheckbox, null, 2));

    // Check what's in the paperListFrm
    const formHTML = await page.evaluate(() => {
      const form = document.getElementById('paperListFrm');
      return form?.innerHTML?.substring(0, 5000) || 'form not found';
    });
    console.log("\n=== paperListFrm HTML ===");
    console.log(formHTML);

    // Try direct JavaScript form submission
    console.log("\n=== Direct JS search ===");
    const searchResult = await page.evaluate(() => {
      // Try to use the search() function
      if (typeof (window as any).search === 'function') {
        (window as any).search();
        return 'search() called';
      }
      return 'search() not found';
    });
    console.log(searchResult);

    await page.waitForTimeout(3000);

    // Check results
    const problemBtns = page.locator("button:has-text('문제')");
    console.log(`\n문제 버튼: ${await problemBtns.count()}개`);

  } finally {
    await browser.close();
  }
}

testDirectFilter();
