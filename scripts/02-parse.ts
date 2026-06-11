import * as fs from "fs";
import * as path from "path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const CMAP_DIR = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "cmaps") + "/";

const DOWNLOAD_DIR = path.resolve("downloads");
const OUTPUT_DIR = path.resolve("data/extracted");

const TARGET_RANGES = [
  { start: 20, end: 24 },
  { start: 29, end: 42 },
];

function isTargetQuestion(no: number): boolean {
  return TARGET_RANGES.some((r) => no >= r.start && no <= r.end);
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function extractText(pdfPath: string): Promise<string> {
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

function parsePassages(text: string): Map<number, string> {
  const result = new Map<number, string>();
  const lines = text.split("\n");
  let currentNo = 0;
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const qMatch = trimmed.match(/^(\d{1,2})\s*\.\s*/);
    if (qMatch) {
      if (currentNo > 0 && currentLines.length > 0) {
        const passage = currentLines.join("\n").trim();
        if (passage.length > 50) result.set(currentNo, passage);
      }
      currentNo = parseInt(qMatch[1]);
      currentLines = [];
      const rest = trimmed.substring(qMatch[0].length).trim();
      if (rest) currentLines.push(rest);
    } else if (currentNo > 0) {
      currentLines.push(trimmed);
    }
  }
  if (currentNo > 0 && currentLines.length > 0) {
    const passage = currentLines.join("\n").trim();
    if (passage.length > 50) result.set(currentNo, passage);
  }
  return result;
}

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

const INSTRUCTION_PATTERNS = [
  /다음 글을 읽고/,
  /물음에 답하시오/,
  /보기 중/,
  /보기 에서/,
  /~\s*\d+\]/,
];

function isBlankMarker(text: string): boolean {
  const cleaned = text.replace(/\s/g, "");
  if (/^\([a-eA-E]\)(?:\([a-eA-E]\))+$/.test(cleaned)) return true;
  if (/^\([A-E]\)$/.test(cleaned)) return true;
  return false;
}

function isInstructionLine(text: string): boolean {
  if (!/[가-힣]/.test(text)) return false;
  return INSTRUCTION_PATTERNS.some((pat) => pat.test(text));
}

function extractEnglishPassage(text: string): string | null {
  const lines = text.split("\n");
  const englishLines: string[] = [];
  let started = false;
  let blankCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (started) {
        blankCount++;
        if (blankCount <= 1) englishLines.push("");
      }
      continue;
    }
    blankCount = 0;
    const cleaned = trimmed.replace(/[①②③④⑤]/g, "").trim();
    if (!cleaned) continue;
    if (isInstructionLine(cleaned) || isBlankMarker(cleaned)) continue;
    const firstReal = cleaned.replace(/\s/g, "").charAt(0);
    if (/[가-힣]/.test(firstReal)) {
      if (!started) continue;
      break;
    }
    if (started && /^\s*\*/.test(cleaned)) break;
    const koreanCount = (cleaned.match(/[가-힣]/g) || []).length;
    const totalChars = cleaned.replace(/\s/g, "").length;
    if (totalChars === 0) continue;
    const englishRatio = (totalChars - koreanCount) / totalChars;
    if (englishRatio > 0.5) {
      englishLines.push(cleaned);
      started = true;
    } else if (started && englishRatio > 0.3) {
      englishLines.push(cleaned);
    } else if (started) {
      break;
    }
  }

  if (englishLines.length === 0) return null;
  return englishLines.map((s) => s.replace(/\s+/g, " ").trim()).join("\n").trim();
}

interface ParsedResult {
  exam: string;
  questionNo: number;
  english: string;
  korean: string;
}

async function processExam(saveDir: string, examLabel: string): Promise<ParsedResult[]> {
  const results: ParsedResult[] = [];
  const files = fs.readdirSync(saveDir).filter((f) => f.endsWith(".pdf"));
  const munFiles = files.filter((f) => f.includes("_mun_"));
  const hsjFiles = files.filter((f) => f.includes("_hsj_") || f.includes("_hae_"));
  if (munFiles.length === 0) return results;

  console.log(`\n📖 [${examLabel}] 문제지:${munFiles.length} 해설:${hsjFiles.length}`);

  for (const munFile of munFiles) {
    const munIdx = munFiles.indexOf(munFile);
    const hsjFile = hsjFiles[Math.min(munIdx, hsjFiles.length - 1)];
    if (!hsjFile) {
      console.log(`  ⏭️  ${munFile}: 매칭 해설 없음`);
      continue;
    }

    const problemPath = path.join(saveDir, munFile);
    const solutionPath = path.join(saveDir, hsjFile);

    const problemText = await extractText(problemPath);
    const solutionText = await extractText(solutionPath);

    const passages = parsePassages(problemText);
    const translations = parseTranslations(solutionText);

    let count = 0;
    for (const [qNo, rawText] of passages) {
      if (!isTargetQuestion(qNo)) continue;
      const english = extractEnglishPassage(rawText);
      if (!english || english.length < 30) continue;
      const korean = translations.get(qNo) || "";
      results.push({ exam: examLabel, questionNo: qNo, english, korean });
      count++;
    }

    if (count > 0) console.log(`  ✅ ${munFile}: ${count}개 추출`);
  }

  return results;
}

async function main() {
  ensureDir(OUTPUT_DIR);
  let allResults: ParsedResult[] = [];

  const grades = fs.readdirSync(DOWNLOAD_DIR).filter((f) => f.startsWith("high"));
  for (const grade of grades) {
    const gradeDir = path.join(DOWNLOAD_DIR, grade);
    if (!fs.statSync(gradeDir).isDirectory()) continue;
    const exams = fs.readdirSync(gradeDir).filter((f) => f.includes("_"));
    for (const exam of exams) {
      const examDir = path.join(gradeDir, exam);
      if (!fs.statSync(examDir).isDirectory()) continue;
      const results = await processExam(examDir, `${grade}/${exam}`);
      allResults = allResults.concat(results);
    }
  }

  const outputPath = path.join(OUTPUT_DIR, "parsed.json");
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2), "utf-8");
  console.log(`\n📊 총 ${allResults.length}개 지문 → ${outputPath}`);
}

main().catch(console.error);
