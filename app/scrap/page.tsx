import ScrapList from "@/components/scrap-list";
import BackButton from "@/components/back-button";

export default function ScrapPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-12 lg:max-w-5xl xl:max-w-6xl xl:py-16">
      <BackButton />
      <header className="mb-8 md:mb-10">
        <h1 className="text-[24px] font-semibold tracking-tight text-zinc-900 md:text-[28px] lg:text-3xl">
          내 서재
        </h1>
        <p className="mt-2 text-[14px] text-zinc-500 md:text-base">
          스크랩한 지문을 모아볼 수 있어요
        </p>
      </header>
      <ScrapList />
    </main>
  );
}
