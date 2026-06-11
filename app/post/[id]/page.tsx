import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { posts } from "@/data/posts";
import { generatedPosts } from "@/data/generated-posts";
import TranslationToggle from "@/components/translation-toggle";
import BackButton from "@/components/back-button";
import ScrapButton from "@/components/scrap-button";

const allPosts = [...posts, ...generatedPosts];

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = allPosts.find((p) => p.id === id);
  if (!post) return {};
  return {
    title: `${post.title} | Read:Mo`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = allPosts.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-[42rem] px-4 py-8 md:px-6 md:py-12 lg:max-w-[48rem] xl:max-w-[56rem] xl:py-16">
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            tags: post.tags,
            articleBody: post.content.join("\n"),
          }),
        }}
      />
      <BackButton />

      <article>
        <header className="mb-8 md:mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.examInfo && (
              <span className="inline-flex items-center rounded-lg bg-[#f2f4f6] px-2.5 py-1 text-xs font-semibold text-[#4e5968] md:px-3">
                {post.examInfo}
              </span>
            )}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#f8f9fa] px-2 py-0.5 text-xs font-medium text-[#8b95a1] md:px-2.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#191f28] md:text-[26px] lg:text-[28px]">
            {post.title}
          </h1>
          <p className="mt-3 text-[14px] text-[#4e5968] md:text-[15px]">{post.description}</p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#8b95a1] md:text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {post.readTime}
            </div>
            <ScrapButton postId={post.id} />
          </div>
        </header>

        <div className="font-serif text-[1rem] leading-[1.75] text-[#191f28] md:text-[1.0625rem] lg:text-[1.125rem] lg:leading-[1.8]">
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
