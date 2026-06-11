"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { Post } from "@/data/posts";

interface PostFeedProps {
  posts: Post[];
}

function TagButton({
  tag,
  active,
  onClick,
}: {
  tag: string | null;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all md:px-3.5 md:py-1.5 md:text-sm ${
        active
          ? "bg-[#3182f6] text-white shadow-sm shadow-[#3182f6]/20"
          : "bg-white text-[#4e5968] hover:bg-[#f8f9fa] ring-1 ring-[rgba(0,27,55,0.08)]"
      }`}
    >
      {tag ?? "전체"}
    </button>
  );
}

function TagFilter({
  posts,
  activeTags,
  onTagClick,
}: {
  posts: Post[];
  activeTags: Set<string>;
  onTagClick: (tag: string | null) => void;
}) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  if (allTags.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 md:mb-8">
      <TagButton
        tag={null}
        active={activeTags.size === 0}
        onClick={() => onTagClick(null)}
      />
      {allTags.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          active={activeTags.has(tag)}
          onClick={() => onTagClick(tag)}
        />
      ))}
    </div>
  );
}

export default function PostFeed({ posts }: PostFeedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTags = useMemo(() => {
    const tags = searchParams.get("tags");
    if (!tags) return new Set<string>();
    return new Set(tags.split(",").filter(Boolean));
  }, [searchParams]);

  const handleTagClick = useCallback(
    (tag: string | null) => {
      const newTags = new Set(activeTags);
      if (tag === null) {
        newTags.clear();
      } else if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }

      const params = new URLSearchParams(searchParams.toString());
      if (newTags.size === 0) {
        params.delete("tags");
      } else {
        params.set("tags", Array.from(newTags).join(","));
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [activeTags, searchParams, pathname, router]
  );

  const filteredPosts = useMemo(() => {
    if (activeTags.size === 0) return posts;
    return posts.filter((p) => activeTags.size === 0 || activeTags.size === 1
      ? p.tags.some((t) => activeTags.has(t))
      : Array.from(activeTags).every((tag) => p.tags.includes(tag))
    );
  }, [posts, activeTags]);

  return (
    <>
      <TagFilter posts={posts} activeTags={activeTags} onTagClick={handleTagClick} />

      <div className="space-y-3 md:space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="group block rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(0,27,55,0.06)] ring-1 ring-[rgba(0,27,55,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,27,55,0.12)] hover:ring-[rgba(0,27,55,0.12)] hover:-translate-y-0.5 md:rounded-2xl md:p-6"
          >
            <article>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.examInfo && (
                  <span className="inline-flex items-center rounded-lg bg-[#f2f4f6] px-2.5 py-1 text-xs font-semibold text-[#4e5968] md:px-3">
                    {post.examInfo}
                  </span>
                )}
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      activeTags.has(tag)
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
              <h2 className="text-base font-bold tracking-tight text-[#191f28] transition-colors group-hover:text-[#3182f6] md:text-lg lg:text-xl">
                {post.title}
              </h2>
              <p className="mt-2 leading-relaxed text-[#4e5968] text-[14px] line-clamp-2 md:text-[15px]">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[#8b95a1] md:text-sm">
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
        <div className="py-16 text-center md:py-20">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8f9fa] md:h-16 md:w-16">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-7 md:h-7">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <p className="text-base font-medium text-[#4e5968] md:text-lg">
            선택한 태그의 지문이 없어요
          </p>
          <button
            onClick={() => handleTagClick(null)}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#3182f6] hover:underline md:text-base"
          >
            전체 보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
