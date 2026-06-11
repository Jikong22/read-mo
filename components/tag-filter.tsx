"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface TagFilterProps {
  posts: { tags: string[] }[];
}

export default function TagFilter({ posts }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const createTagUrl = useCallback(
    (tag: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }
      return `/?${params.toString()}`;
    },
    [searchParams]
  );

  if (allTags.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => router.push(createTagUrl(null), { scroll: false })}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            !activeTag
              ? "bg-zinc-900 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          전체
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              router.push(
                createTagUrl(activeTag === tag ? null : tag),
                { scroll: false }
              )
            }
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTag === tag
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
