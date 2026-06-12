"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="이전 페이지로 돌아가기"
      className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1.5 text-xs font-medium text-text-secondary transition-all hover:bg-primary-light hover:text-primary md:mb-8 md:gap-2 md:px-3.5 md:py-2 md:text-sm"
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
        className="md:w-4 md:h-4"
        aria-hidden="true"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      뒤로가기
    </button>
  );
}
