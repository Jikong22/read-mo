import { Suspense } from "react";
import { posts } from "@/data/posts";
import { generatedPosts } from "@/data/generated-posts";
import PostFeed from "@/components/post-feed";

const allPosts = [...generatedPosts, ...posts];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-[#e8f3ff] px-3 py-1 text-xs font-semibold text-[#3182f6]">
            수능/모의고사
          </span>
          <span className="inline-flex items-center rounded-full bg-[#f2f4f6] px-3 py-1 text-xs font-semibold text-[#4e5968]">
            {allPosts.length}개 지문
          </span>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#191f28]">
          Read:Mo
        </h1>
        <p className="mt-2 text-[15px] text-[#4e5968]">
          수능 · 모의고사 영어 지문을 세련된 웹진으로 읽어보세요
        </p>
      </header>

      <Suspense fallback={null}>
        <PostFeed posts={allPosts} />
      </Suspense>
    </main>
  );
}
