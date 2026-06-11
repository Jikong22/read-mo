import * as fs from "fs";
import * as path from "path";

const INPUT_PATH = path.resolve("data/extracted/parsed.json");
const OUTPUT_PATH = path.resolve("data/generated-posts.ts");

const TAG_KEYWORDS: Record<string, string[]> = {
  "#심리학": ["psycholog", "mental", "emotion", "brain", "memory", "perception", "cognitive", "behavior"],
  "#철학": ["philosoph", "ethics", "moral", "existence", "consciousness", "reasoning", "logic"],
  "#과학": ["science", "physics", "biology", "chemistry", "quantum", "gene", "evolution", "climate", "energy"],
  "#경제": ["econom", "market", "trade", "finance", "capital", "price", "inflation", "gdp"],
  "#사회": ["societ", "culture", "social", "community", "institution", "policy", "law", "right"],
  "#예술": ["art", "music", "painting", "literature", "poem", "novel", "artist", "beauty"],
  "#역사": ["history", "ancient", "century", "era", "civilization", "tradition", "origin"],
};

const GRADE_MAP: Record<string, string> = {
  high1: "고1",
  high2: "고2",
  high3: "고3",
};

function detectTags(english: string): string[] {
  const tags: string[] = [];
  const lower = english.toLowerCase();
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) { tags.push(tag); break; }
    }
  }
  if (tags.length === 0) tags.push("#일반");
  return tags;
}

// ─── Translation cleaning ──────────────────────────────────

function cleanTranslation(raw: string): string {
  let text = raw.replace(/\t+/g, " ").replace(/\s+/g, " ").trim();

  // Strip meta sections: [해설], [어휘 및 어구], etc.
  text = text.replace(/\s*\[해설\].*/, "");
  text = text.replace(/\s*\[어휘\s*및\s*어구\].*/, "");
  text = text.replace(/\s*\[어휘\].*/, "");
  text = text.replace(/\s*\[Words\s*and\s*Phrases\].*/i, "");
  text = text.replace(/\s*\[Words\].*/i, "");
  text = text.replace(/\s*\[풀이\].*/, "");
  text = text.replace(/\s*\[정답\].*/, "");
  text = text.replace(/\s*\*\s*agenda.*/i, "");
  text = text.replace(/\s*\*\s*tense.*/i, "");

  // Strip PDF page artifacts: "-- N of M --", exam headers
  text = text.replace(/\s*--\s*\d+\s*of\s*\d+\s*--\s*/g, "");
  text = text.replace(/\d{4}학년도\s+\d+월\s+전국연합학력평가\s+정답\s*및\s*해설/g, "");
  text = text.replace(/고\s*\d+\s*\d+\s*\d+\s*/g, "");

  // Strip blank markers: (A), (B), (C) at start of text
  text = text.replace(/^\([A-Ea-e]\)\s*/, "");
  text = text.replace(/\s+\([A-Ea-e]\)\s+/g, " ");

  return text.replace(/\s+/g, " ").trim();
}

// ─── Korean title / description ────────────────────────────

const JOSA_PREFIX = /^[을를은는이가의에에서로으로과와도만까지부터](?:\s|$)/;

function englishTitle(english: string): string {
  const sentences = english.split(/[.!?]\s+/);
  for (const s of sentences) {
    const t = s.trim().replace(/\s+/g, " ").trim();
    if (t.length > 20) {
      return t.replace(/[""''""]/g, "").substring(0, 60);
    }
  }
  return english.split(/\s+/).slice(0, 8).join(" ") + "…";
}

function koreanDescription(korean: string): string {
  const cleaned = cleanTranslation(korean);
  // 첫 문장이 조사로 시작하면 건너뛰기
  const sentences = cleaned.split(/(?<=[.!?])\s+/);
  let desc = "";
  for (const s of sentences) {
    const t = s.trim();
    if (JOSA_PREFIX.test(t)) continue;
    desc += t + " ";
    if (desc.length > 60) break;
  }
  desc = desc.trim();
  return desc.length > 80 ? desc.substring(0, 78) + "…" : desc;
}

// ─── Content cleaning ──────────────────────────────────────

function stripAnswerChoices(paragraph: string): string {
  const lines = paragraph.split("\n");
  if (lines.length < 4) return paragraph;

  let tailStart = lines.length;
  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmed = lines[i].trim();
    if (!trimmed) { tailStart = i; continue; }
    const words = trimmed.split(/\s+/).filter(Boolean);
    // Answer choices: 2-7 words, no punctuation at end, starts lowercase
    const isChoiceLine =
      words.length >= 2 &&
      words.length <= 7 &&
      !/[.!?]$/.test(trimmed) &&
      /^[a-z]/.test(trimmed.charAt(0));
    if (isChoiceLine) {
      tailStart = i;
    } else {
      break;
    }
  }

  if (tailStart < lines.length - 3) {
    return lines.slice(0, tailStart).join("\n").trim();
  }
  return paragraph;
}

function isGarbageParagraph(text: string): boolean {
  const cleaned = text.trim();
  if (cleaned.length < 30) return true;
  if (/^\s*\*/.test(cleaned)) return true;
  const koreanCount = (cleaned.match(/[가-힣]/g) || []).length;
  const total = cleaned.replace(/\s/g, "").length;
  if (total > 0 && koreanCount / total > 0.4) return true;

  // Answer choice list: many short fragments separated by \n
  const lines = cleaned.split("\n").filter(l => l.trim());
  if (lines.length >= 3 && lines.every(l => l.trim().split(/\s+/).length < 10 && !/[.!?]$/.test(l.trim()))) {
    return true;
  }
  return false;
}

// ─── Helpers ───────────────────────────────────────────────

function estimateReadTime(paragraphs: string[]): string {
  const wordCount = paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0);
  return `${Math.max(1, Math.round(wordCount / 200))} min read`;
}

function parseExamInfo(exam: string): { grade: string; examInfo: string; questionNo?: number } {
  const parts = exam.split("/");
  const rawGrade = parts[0] || "";
  const rawDate = parts[1] || "";
  const grade = GRADE_MAP[rawGrade] || rawGrade;
  const [year, month] = rawDate.split("_");
  const examInfo = `${grade} · ${year}년 ${month}월`;
  return { grade, examInfo };
}

// ─── Types ─────────────────────────────────────────────────

interface ParsedPassage {
  exam: string;
  questionNo: number;
  english: string;
  korean: string;
}

interface PostData {
  id: string;
  title: string;
  description: string;
  content: string[];
  translation: string[];
  tags: string[];
  readTime: string;
  grade?: string;
  examInfo?: string;
}

// ─── Main ──────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`❌ ${INPUT_PATH} 없음. 먼저 02-parse.ts를 실행하세요.`);
    process.exit(1);
  }

  const passages: ParsedPassage[] = JSON.parse(fs.readFileSync(INPUT_PATH, "utf-8"));
  console.log(`📖 ${passages.length}개 지문 로드됨`);

  const withTranslation = passages.filter((p) => p.korean.trim().length > 0);
  console.log(`🔍 번역 있는 지문: ${withTranslation.length}개`);

  const posts: PostData[] = withTranslation.map((p) => {
    let content = p.english
      .split(/\n\s*\n/)
      .map((s) => stripAnswerChoices(s.trim()))
      .filter((s) => s.length > 20 && !isGarbageParagraph(s));

    if (content.length === 0 && p.english.trim().length > 30) {
      const cleaned = stripAnswerChoices(p.english.trim());
      if (cleaned.length > 20) content = [cleaned];
    }

    const cleanedKorean = cleanTranslation(p.korean);
    const translation = cleanedKorean ? [cleanedKorean] : [""];

    const baseId = p.exam.replace(/[/\\]/g, "_") + "_q" + p.questionNo;
    const { grade, examInfo } = parseExamInfo(p.exam);

    return {
      id: baseId,
      title: englishTitle(p.english),
      description: koreanDescription(p.korean),
      content,
      translation,
      tags: detectTags(p.english),
      readTime: estimateReadTime(content),
      grade,
      examInfo,
    };
  });

  // 중복 ID 처리: 같은 ID가 2개면 첫 번째는 그대로, 두 번째부터 _2, _3 접미사
  const idCount = new Map<string, number>();
  for (const p of posts) {
    idCount.set(p.id, (idCount.get(p.id) || 0) + 1);
  }
  const seen = new Map<string, number>();
  for (const p of posts) {
    const count = seen.get(p.id) || 0;
    seen.set(p.id, count + 1);
    if ((idCount.get(p.id) || 1) > 1 && count > 0) {
      p.id = p.id + "_" + (count + 1);
    }
  }

  const tsContent = `import type { Post } from "@/data/posts";

export const generatedPosts: Post[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, "utf-8");
  console.log(`✅ ${posts.length}개 포스트 생성 → ${OUTPUT_PATH}`);
}

main();
