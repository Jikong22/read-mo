import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import * as fs from "fs";
import * as path from "path";

const CMAP_DIR = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "cmaps") + "/";

async function testExtract(pdfPath: string) {
  const buf = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({
    data: buf,
    cMapUrl: CMAP_DIR,
    cMapPacked: true,
  }).promise;
  
  const page = await doc.getPage(1);
  const content = await page.getTextContent();
  
  // Print first 20 text items with their properties
  console.log("=== Text Items (first 20) ===");
  for (let i = 0; i < Math.min(20, content.items.length); i++) {
    const item = content.items[i] as any;
    console.log(`[${i}] str: "${item.str}" | x: ${item.transform[4].toFixed(2)} | y: ${item.transform[5].toFixed(2)} | hasEOL: ${item.hasEOL} | font: ${item.fontName || 'N/A'}`);
  }
  
  // Also print the raw text to see the first few lines
  let text = "";
  for (const item of content.items) {
    const t = item as any;
    text += t.str;
    if (t.hasEOL) text += "\n";
  }
  
  console.log("\n=== First 500 chars of extracted text ===");
  console.log(text.substring(0, 500));
}

const testPath = "downloads/high1/2021_09/eng_hsj_AX6SAY91.pdf";
console.log("Testing:", testPath);
testExtract(testPath).catch(console.error);
