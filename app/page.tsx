import { Suspense } from "react";
import { posts } from "@/data/posts";
import { generatedPosts } from "@/data/generated-posts";
import PostFeed from "@/components/post-feed";

const allPosts = [...generatedPosts, ...posts];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-10 lg:max-w-5xl xl:max-w-6xl xl:px-8 xl:py-12">
      <header className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary-dark md:text-sm">
            수능/모의고사
          </span>
          <span className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-secondary md:text-sm">
            {allPosts.length}개 지문
          </span>
        </div>
        <h1 className="text-[24px] font-bold tracking-tight text-text-primary md:text-[28px] lg:text-[32px]">
          Read:Mo
        </h1>
        <p className="mt-2 text-[14px] text-text-secondary md:text-[15px]">
          수능 · 모의고사 영어 지문을 세련된 웹진으로 읽어보세요
        </p>
      </header>

      <Suspense fallback={null}>
        <PostFeed posts={allPosts} />
      </Suspense>
    </main>
  );
}
