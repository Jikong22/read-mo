import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import * as fs from "fs";
import * as path from "path";

const CMAP_DIR = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "cmaps") + "/";

// Test the parseTranslations function with the extracted text
function parseTranslations(text: string): Map<number, string> {
  const result = new Map<number, string>();
  const lines = text.split("\n");
  let currentNo = 0;
  let inHae = false;
  let haeLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.includes("[해석]")) {
      if (currentNo > 0 && haeLines.length > 0) {
        result.set(currentNo, haeLines.join("\n").trim());
      }
      haeLines = [];
      inHae = true;
      
      // Extract text after [해석] marker
      const afterHae = trimmed.split("[해석]")[1];
      if (afterHae && afterHae.trim()) {
        haeLines.push(afterHae.trim());
      }
      continue;
    }
    if (inHae && (trimmed.startsWith("[풀이]") || trimmed.startsWith("[Words"))) {
      if (currentNo > 0 && haeLines.length > 0) {
        result.set(currentNo, haeLines.join("\n").trim());
      }
      inHae = false;
      haeLines = [];
      continue;
    }
    const qMatch = trimmed.match(/^(\d{1,2})\s*\.\s*/);
    if (qMatch) {
      if (inHae && currentNo > 0 && haeLines.length > 0) {
        result.set(currentNo, haeLines.join("\n").trim());
      }
      currentNo = parseInt(qMatch[1]);
      inHae = false;
      haeLines = [];
      continue;
    }
    if (inHae) haeLines.push(trimmed);
  }
  if (inHae && currentNo > 0 && haeLines.length > 0) {
    result.set(currentNo, haeLines.join("\n").trim());
  }
  return result;
}

async function testExtract(pdfPath: string): Promise<string> {
  const buf = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({
    data: buf,
    cMapUrl: CMAP_DIR,
    cMapPacked: true,
  }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    for (const item of content.items) {
      const t = item as any;
      text += t.str;
      if (t.hasEOL) text += "\n";
    }
  }
  return text;
}

async function main() {
  const testPath = "downloads/high1/2021_09/eng_hsj_AX6SAY91.pdf";
  const text = await testExtract(testPath);
  const translations = parseTranslations(text);
  
  console.log("=== Question 20 ===");
  console.log(translations.get(20) || "NOT FOUND");
  
  console.log("\n=== Question 22 ===");
  console.log(translations.get(22) || "NOT FOUND");
}

main().catch(console.error);
