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
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
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
    <div className="mb-10 flex flex-wrap items-center gap-2">
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

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="group block rounded-2xl bg-white p-7 shadow-sm ring-1 ring-zinc-100 transition-all duration-300 hover:shadow-lg hover:ring-zinc-200 hover:-translate-y-0.5"
          >
            <article>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.examInfo && (
                  <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 tracking-tight">
                    {post.examInfo}
                  </span>
                )}
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      activeTag === tag
                        ? "bg-zinc-200 text-zinc-800"
                        : "bg-zinc-50 text-zinc-400"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700">
                {post.title}
              </h2>
              <p className="mt-2.5 leading-relaxed text-zinc-500 text-[15px]">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
                <span>{post.readTime}</span>
                <span className="text-zinc-300">·</span>
                <span className="group-hover:text-zinc-600 transition-colors">
                  읽기 →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-zinc-400">
            ‘{activeTag}’ 태그의 지문이 없어요
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-900"
          >
            전체 보기 →
          </Link>
        </div>
      )}
    </>
  );
}
