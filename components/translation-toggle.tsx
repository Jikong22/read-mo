"use client";

import { useState } from "react";

export default function TranslationToggle({
  english,
  korean,
}: {
  english: string;
  korean: string;
}) {
  const [open, setOpen] = useState(false);
  const hasTranslation = korean.trim().length > 0;

  return (
    <div className="mb-8">
      <p className="leading-[1.8] text-zinc-800">{english}</p>
      {hasTranslation && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="mt-2 text-sm text-zinc-400 transition-colors hover:text-zinc-700"
          >
            {open ? "▲ 해석 닫기" : "▼ 해석 보기"}
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pt-3 leading-[1.8] text-zinc-500">{korean}</p>
          </div>
        </>
      )}
    </div>
  );
}
