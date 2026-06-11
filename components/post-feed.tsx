"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Post } from "@/data/posts";

interface PostFeedProps {
  posts: Post[];
}

function TagButton({ tag, active }: { tag: string | null; active: boolean }) {
  const href = tag ? `/?tag=${encodeURIComponent(tag)}` : "/";
  return (
    <Link
      href={href}
      scroll={false}
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
        active
          ? "bg-[#3182f6] text-white shadow-sm shadow-[#3182f6]/20"
          : "bg-white text-[#4e5968] hover:bg-[#f8f9fa] ring-1 ring-[rgba(0,27,55,0.08)]"
      }`}
    >
      {tag ?? "전체"}
    </Link>
  );
}

function TagFilter({ posts, activeTag }: { posts: Post[]; activeTag: string | null }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  if (allTags.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <TagButton tag={null} active={!activeTag} />
      {allTags.map((tag) => (
        <TagButton key={tag} tag={tag} active={activeTag === tag} />
      ))}
    </div>
  );
}

export default function PostFeed({ posts }: PostFeedProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <>
      <TagFilter posts={posts} activeTag={activeTag} />

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="group block rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,27,55,0.06)] ring-1 ring-[rgba(0,27,55,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,27,55,0.12)] hover:ring-[rgba(0,27,55,0.12)] hover:-translate-y-0.5"
          >
            <article>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.examInfo && (
                  <span className="inline-flex items-center rounded-lg bg-[#f2f4f6] px-2.5 py-1 text-xs font-semibold text-[#4e5968]">
                    {post.examInfo}
                  </span>
                )}
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      activeTag === tag
                        ? "bg-[#e8f3ff] text-[#3182f6]"
                        : "bg-[#f8f9fa] text-[#8b95a1]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-[#8b95a1]">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#191f28] transition-colors group-hover:text-[#3182f6]">
                {post.title}
              </h2>
              <p className="mt-2 leading-relaxed text-[#4e5968] text-[15px] line-clamp-2">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-[#8b95a1]">
                <span className="inline-flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {post.readTime}
                </span>
                <span className="text-[#d1d6db]">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-[#3182f6] opacity-0 transition-opacity group-hover:opacity-100">
                  읽기
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8f9fa]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <p className="text-lg font-medium text-[#4e5968]">
            ‘{activeTag}’ 태그의 지문이 없어요
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#3182f6] hover:underline"
          >
            전체 보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
