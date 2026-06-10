import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/60 bg-[#FAFAFA]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
          Read:Mo
        </Link>
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900">
            로그인
          </button>
          <button className="text-sm text-zinc-500 transition-colors hover:text-zinc-800">
            내 스크랩
          </button>
        </div>
      </div>
    </nav>
  );
}
