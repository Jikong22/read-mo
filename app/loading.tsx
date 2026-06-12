export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-20 md:px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-light border-t-primary" role="status" aria-label="로딩 중">
          <span className="sr-only">로딩 중...</span>
        </div>
        <p className="text-sm text-text-secondary md:text-base" aria-hidden="true">불러오는 중...</p>
      </div>
    </main>
  );
}
