"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function LiveClock() {
  // Render an empty placeholder on the server to avoid hydration mismatches.
  const [time, setTime] = useState<string>("--:-- --");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
