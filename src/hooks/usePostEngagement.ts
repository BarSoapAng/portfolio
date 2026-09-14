"use client";
import { useCallback, useEffect, useState } from "react";
import { getVisitorId } from "@lib/visitor-id";

export function usePostEngagement(slug: string) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const visitorId = getVisitorId();
    fetch(`/api/blog/${slug}/views`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.count))
      .catch(() => {});
    fetch(`/api/blog/${slug}/likes?visitor_id=${visitorId}`)
      .then((r) => r.json())
      .then((d) => { setLikes(d.count); setLiked(d.likedByVisitor); })
      .catch(() => {});
  }, [slug]);

  const toggleLike = useCallback(async () => {
    if (toggling) return;
    setToggling(true);
    const visitorId = getVisitorId();
    try {
      const res = await fetch(`/api/blog/${slug}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorId }),
      });
      const data = await res.json();
      setLikes(data.count);
      setLiked(data.likedByVisitor);
    } finally {
      setToggling(false);
    }
  }, [slug, toggling]);

  return { views, likes, liked, toggleLike, toggling };
}
