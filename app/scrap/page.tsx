import ScrapList from "@/components/scrap-list";
import BackButton from "@/components/back-button";

export default function ScrapPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <BackButton />
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          내 서재
        </h1>
        <p className="mt-2 text-zinc-500">
          스크랩한 지문을 모아볼 수 있어요
        </p>
      </header>
      <ScrapList />
    </main>
  );
}
