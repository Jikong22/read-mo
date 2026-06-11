"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#f8f9fa] px-3.5 py-2 text-sm font-medium text-[#4e5968] transition-all hover:bg-[#e8f3ff] hover:text-[#3182f6]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      뒤로가기
    </button>
  );
}
