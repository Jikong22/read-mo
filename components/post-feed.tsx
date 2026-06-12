"use client";

import { useMemo, useCallback, useState } from "react";
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
      aria-pressed={active}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all md:px-3.5 md:py-1.5 md:text-sm ${
active
           ? "bg-primary-dark text-white shadow-sm shadow-primary-dark/20"
           : "bg-surface text-text-secondary hover:bg-surface-raised ring-1 ring-border-light"
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
    <div role="group" aria-label="태그 필터" className="mb-6 flex flex-wrap items-center gap-2 md:mb-8">
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
  const [searchQuery, setSearchQuery] = useState("");

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
    let result = posts;
    if (activeTags.size > 0) {
      result = result.filter((p) => activeTags.size === 1
        ? p.tags.some((t) => activeTags.has(t))
        : Array.from(activeTags).every((tag) => p.tags.includes(tag))
      );
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    return result;
  }, [posts, activeTags, searchQuery]);

  return (
    <>
      <div className="mb-4 md:mb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="지문 검색..."
            aria-label="지문 검색"
            className="w-full rounded-xl bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary shadow-[0_2px_8px_var(--shadow-color)] ring-1 ring-border-light transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 md:py-3 md:text-base"
          />
        </div>
      </div>
      <TagFilter posts={posts} activeTags={activeTags} onTagClick={handleTagClick} />

      <div className="space-y-3 md:space-y-4" role="list" aria-label="지문 목록">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="group block rounded-xl bg-surface p-4 shadow-[0_2px_8px_var(--shadow-color)] ring-1 ring-border-light transition-all duration-300 hover:shadow-[0_8px_24px_var(--shadow-color-hover)] hover:ring-border hover:-translate-y-0.5 md:rounded-2xl md:p-6"
            role="listitem"
          >
            <article>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.examInfo && (
                  <span className="inline-flex items-center rounded-lg bg-background px-2.5 py-1 text-xs font-semibold text-text-secondary md:px-3">
                    {post.examInfo}
                  </span>
                )}
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
activeTags.has(tag)
                         ? "bg-primary-light text-primary"
                         : "bg-surface-raised text-text-secondary"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-text-secondary">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold tracking-tight text-text-primary transition-colors group-hover:text-primary md:text-lg lg:text-xl">
                {post.title}
              </h2>
              <p className="mt-2 leading-relaxed text-text-secondary text-[14px] line-clamp-2 md:text-[15px]">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-text-secondary md:text-sm">
                <span className="inline-flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {post.readTime}
                </span>
                <span className="text-border-light">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  읽기
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-raised md:h-16 md:w-16">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary md:w-7 md:h-7" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <p className="text-base font-medium text-text-secondary md:text-lg">
            선택한 태그의 지문이 없어요
          </p>
          <button
            onClick={() => handleTagClick(null)}
            aria-label="태그 필터 초기화"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline md:text-base"
          >
            전체 보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
