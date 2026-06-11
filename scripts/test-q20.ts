import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import * as fs from "fs";
import * as path from "path";

const CMAP_DIR = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "cmaps") + "/";

async function testExtractPage(pdfPath: string, pageNum: number) {
  const buf = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({
    data: buf,
    cMapUrl: CMAP_DIR,
    cMapPacked: true,
  }).promise;
  
  const page = await doc.getPage(pageNum);
  const content = await page.getTextContent();
  
  let text = "";
  for (const item of content.items) {
    const t = item as any;
    text += t.str;
    if (t.hasEOL) text += "\n";
  }
  
  return text;
}

async function findQuestion20(pdfPath: string) {
  const buf = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({
    data: buf,
    cMapUrl: CMAP_DIR,
    cMapPacked: true,
  }).promise;
  
  for (let i = 1; i <= doc.numPages; i++) {
    const text = await testExtractPage(pdfPath, i);
    if (text.includes("20") && text.includes("[해석]")) {
      console.log(`=== Page ${i} ===`);
      // Find the area around question 20
      const lines = text.split("\n");
      let inQ20 = false;
      let q20Lines: string[] = [];
      for (const line of lines) {
        if (line.trim().startsWith("20")) {
          inQ20 = true;
        }
        if (inQ20) {
          q20Lines.push(line);
          if (line.includes("[해설]")) break;
        }
      }
      console.log(q20Lines.join("\n"));
      console.log("\n");
      break;
    }
  }
}

const testPath = "downloads/high1/2021_09/eng_hsj_AX6SAY91.pdf";
console.log("Testing:", testPath);
findQuestion20(testPath).catch(console.error);
