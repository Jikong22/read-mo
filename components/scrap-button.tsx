"use client";

import { useScrap } from "@/hooks/use-scrap";

export default function ScrapButton({ postId }: { postId: string }) {
  const { toggleScrap, isScrapped } = useScrap();
  const scrapped = isScrapped(postId);

  return (
    <button
      onClick={() => toggleScrap(postId)}
      aria-pressed={scrapped}
      aria-label={scrapped ? "스크랩 취소" : "스크랩"}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all md:px-4 md:py-2 md:text-sm ${
        scrapped
          ? "bg-primary text-white shadow-sm shadow-primary/20 hover:bg-primary-dark"
          : "bg-surface-raised text-text-secondary hover:bg-primary-light hover:text-primary"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="md:w-4 md:h-4"
        fill={scrapped ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      {scrapped ? "스크랩됨" : "스크랩"}
    </button>
  );
}
