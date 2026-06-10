import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import TranslationToggle from "@/components/translation-toggle";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-[42rem] px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-700"
        >
          ← 뒤로가기
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {post.title}
            </h1>
            <p className="mt-3 text-zinc-500">{post.description}</p>
            <span className="mt-4 inline-block text-sm text-zinc-400">
              {post.readTime}
            </span>
          </header>

          <div className="font-serif text-[1.0625rem] leading-[1.8]">
            {post.content.map((paragraph, i) => (
              <TranslationToggle
                key={i}
                english={paragraph}
                korean={post.translation[i]}
              />
            ))}
          </div>
        </article>
      </main>
  );
}
