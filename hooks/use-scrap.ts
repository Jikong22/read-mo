"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "readmo_scrap";

function loadScrapIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useScrap() {
  const [scrapIds, setScrapIds] = useState<string[]>(loadScrapIds);

  const toggleScrap = useCallback((id: string) => {
    setScrapIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isScrapped = useCallback(
    (id: string) => scrapIds.includes(id),
    [scrapIds]
  );

  return { scrapIds, toggleScrap, isScrapped };
}
