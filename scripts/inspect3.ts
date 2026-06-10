import { chromium } from "playwright";

async function inspect() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperList.ebs", {
    waitUntil: "networkidle",
  });

  // Click login
  const loginLink = page.locator("a:has-text('로그인')").first();
  await loginLink.click();
  await page.waitForTimeout(5000);
  
  console.log("After login click URL:", page.url());
  console.log("After login click title:", await page.title());

  // Check for popup
  const pages = browser.contexts()[0].pages();
  console.log(`Total pages: ${pages.length}`);
  for (const p of pages) {
    console.log(`  Page: ${p.url()} title: ${await p.title()}`);
  }
}

inspect();
