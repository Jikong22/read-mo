"use client";

import { useState, useId } from "react";

export default function TranslationToggle({
  english,
  korean,
}: {
  english: string;
  korean: string;
}) {
  const [open, setOpen] = useState(false);
  const hasTranslation = korean.trim().length > 0;
  const headingId = useId();
  const panelId = useId();

  return (
    <div className="mb-8 md:mb-10">
      <p className="leading-[1.75] text-text-primary md:leading-[1.8]">{english}</p>
      {hasTranslation && (
        <>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-labelledby={headingId}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-surface-raised px-2.5 py-1 text-xs font-medium text-text-secondary transition-all hover:bg-primary-light hover:text-primary md:px-3 md:py-1.5 md:text-sm"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 md:w-[14px] md:h-[14px] ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <span id={headingId}>{open ? "해석 닫기" : "해석 보기"}</span>
          </button>
          <div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              open ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-xl bg-surface-raised p-4 border border-border-light md:p-5">
              <p className="text-[14px] leading-[1.75] text-text-secondary md:text-[15px] md:leading-[1.8]">{korean}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
