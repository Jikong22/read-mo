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
    <div className="mb-10">
      <p className="leading-[1.8] text-[#191f28]">{english}</p>
      {hasTranslation && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#f8f9fa] px-3 py-1.5 text-sm font-medium text-[#4e5968] transition-all hover:bg-[#e8f3ff] hover:text-[#3182f6]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            {open ? "해석 닫기" : "해석 보기"}
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              open ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-xl bg-[#f8f9fa] p-5 border border-[rgba(0,27,55,0.06)]">
              <p className="text-[15px] leading-[1.8] text-[#4e5968]">{korean}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
