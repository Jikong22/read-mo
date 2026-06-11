"use client";

import { useScrap } from "@/hooks/use-scrap";

export default function ScrapButton({ postId }: { postId: string }) {
  const { toggleScrap, isScrapped } = useScrap();
  const scrapped = isScrapped(postId);

  return (
    <button
      onClick={() => toggleScrap(postId)}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
        scrapped
          ? "bg-zinc-900 text-white hover:bg-zinc-800"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      }`}
    >
      {scrapped ? "★ 스크랩됨" : "☆ 스크랩"}
    </button>
  );
}
