import { Suspense } from "react";
import { posts } from "@/data/posts";
import { generatedPosts } from "@/data/generated-posts";
import PostFeed from "@/components/post-feed";

const allPosts = [...generatedPosts, ...posts];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Read:Mo
        </h1>
        <p className="mt-2 text-zinc-500">
          수능 · 모의고사 영어 지문을 세련된 웹진으로 읽어보세요
        </p>
      </header>

      <Suspense fallback={null}>
        <PostFeed posts={allPosts} />
      </Suspense>
    </main>
  );
}
