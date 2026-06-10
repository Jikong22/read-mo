export interface ExamInfo {
  grade: "high1" | "high2" | "high3";
  year: number;
  month: string; // "03", "06", "09", "11"
  label: string; // e.g. "2026_03_고3"
}

export interface DownloadedFile {
  exam: ExamInfo;
  type: "문제지" | "정답해설";
  path: string; // full path to saved PDF
}

export interface ExtractedPassage {
  examLabel: string;
  questionNo: number;
  english: string; // passage text
  korean: string; // translation text
}
