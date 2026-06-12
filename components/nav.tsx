"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="메인 내비게이션" className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-4 md:h-14 md:px-6 lg:max-w-5xl xl:max-w-6xl xl:px-8">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-text-primary md:text-[17px]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white text-xs font-bold md:h-7 md:w-7 md:text-sm" aria-hidden="true">
            R
          </span>
          Read:Mo
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/scrap"
            aria-current={pathname === "/scrap" ? "page" : undefined}
            className="flex items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1 text-xs font-medium text-text-secondary transition-all hover:bg-primary-light hover:text-primary md:px-3.5 md:py-1.5 md:text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4" aria-hidden="true">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            내 서재
          </Link>
        </div>
      </div>
    </nav>
  );
}
