"use client";

import { useScrap } from "@/hooks/use-scrap";
import { posts } from "@/data/posts";
import { generatedPosts } from "@/data/generated-posts";
import Link from "next/link";

const allPosts = [...posts, ...generatedPosts];

export default function ScrapList() {
  const { scrapIds, toggleScrap, isScrapped } = useScrap();
  const scrappedPosts = allPosts.filter((p) => scrapIds.includes(p.id));

  if (scrapIds.length === 0) {
    return (
      <div className="py-16 text-center md:py-20" role="status">
        <p className="text-base text-text-tertiary md:text-lg">아직 스크랩한 지문이 없어요</p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-text-secondary underline underline-offset-4 hover:text-text-primary"
        >
          지문 둘러보기 →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6" role="list" aria-label="스크랩한 지문 목록">
      {scrappedPosts.map((post) => (
        <div
          key={post.id}
          className="group flex items-start gap-4 rounded-xl bg-surface p-4 shadow-sm ring-1 ring-border-light md:gap-6 md:rounded-2xl md:p-6"
          role="listitem"
        >
          <div className="flex-1 min-w-0">
            <Link
              href={`/post/${post.id}`}
              className="block"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {post.examInfo && (
                  <span className="inline-flex items-center rounded-md bg-surface-raised px-2 py-0.5 text-xs font-medium text-text-secondary">
                    {post.examInfo}
                  </span>
                )}
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-text-primary transition-colors group-hover:text-text-secondary md:text-[17px]">
                {post.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-text-secondary line-clamp-2 md:text-sm">
                {post.description}
              </p>
            </Link>
          </div>
          <button
            onClick={() => toggleScrap(post.id)}
            aria-label={`'${post.title}' 스크랩 취소`}
            className="shrink-0 rounded-full p-1 text-text-tertiary transition-colors hover:text-red-400 cursor-pointer md:p-1.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="md:w-[18px] md:h-[18px]"
              fill={isScrapped(post.id) ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
