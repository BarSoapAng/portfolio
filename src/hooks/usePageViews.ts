"use client";
import { useEffect, useState } from "react";

export function usePageViews() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  return count;
}
