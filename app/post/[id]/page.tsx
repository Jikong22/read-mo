import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { generatedPosts } from "@/data/generated-posts";
import TranslationToggle from "@/components/translation-toggle";
import BackButton from "@/components/back-button";
import ScrapButton from "@/components/scrap-button";

const allPosts = [...posts, ...generatedPosts];

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = allPosts.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-[42rem] px-6 py-16">
        <BackButton />

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.examInfo && (
                <span className="rounded-md bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600">
                  {post.examInfo}
                </span>
              )}
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
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-400">{post.readTime}</span>
              <ScrapButton postId={post.id} />
            </div>
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
