import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(0,27,55,0.1)] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-[#191f28]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3182f6] text-white text-sm font-bold">
            R
          </span>
          Read:Mo
        </Link>
        <Link
          href="/scrap"
          className="flex items-center gap-1.5 rounded-full bg-[#f8f9fa] px-3.5 py-1.5 text-sm font-medium text-[#4e5968] transition-all hover:bg-[#e8f3ff] hover:text-[#3182f6]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          내 서재
        </Link>
      </div>
    </nav>
  );
}
