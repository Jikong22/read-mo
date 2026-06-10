import Link from "next/link";
import { generatedPosts } from "@/data/generated-posts";

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

        <div className="space-y-8">
          {generatedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group block rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-100 transition-all hover:shadow-md hover:ring-zinc-200"
            >
              <article>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {post.examInfo && (
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
                      {post.examInfo}
                    </span>
                  )}
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600">
                  {post.title}
                </h2>
                <p className="mt-2 leading-relaxed text-zinc-500">
                  {post.description}
                </p>
                <span className="mt-4 inline-block text-sm text-zinc-400">
                  {post.readTime}
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
  );
}
