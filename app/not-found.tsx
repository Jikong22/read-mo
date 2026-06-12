import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-raised" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <h1 className="text-[22px] font-bold tracking-tight text-text-primary md:text-[26px]">
        페이지를 찾을 수 없어요
      </h1>
      <p className="mt-3 text-[14px] text-text-secondary md:text-[15px]">
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있어요
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-dark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        홈으로 돌아가기
      </Link>
    </main>
  );
}
