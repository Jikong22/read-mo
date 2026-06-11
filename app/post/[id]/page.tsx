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
    <main className="mx-auto w-full max-w-[42rem] px-6 py-12">
      <BackButton />

      <article>
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.examInfo && (
              <span className="inline-flex items-center rounded-lg bg-[#f2f4f6] px-2.5 py-1 text-xs font-semibold text-[#4e5968]">
                {post.examInfo}
              </span>
            )}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#f8f9fa] px-2.5 py-0.5 text-xs font-medium text-[#8b95a1]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-[26px] font-bold tracking-tight text-[#191f28]">
            {post.title}
          </h1>
          <p className="mt-3 text-[15px] text-[#4e5968]">{post.description}</p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#8b95a1]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {post.readTime}
            </div>
            <ScrapButton postId={post.id} />
          </div>
        </header>

        <div className="font-serif text-[1.0625rem] leading-[1.8] text-[#191f28]">
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
