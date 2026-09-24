"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, parameters: Record<string, string | boolean>) {
  window.gtag?.("event", event, parameters);
}

function getLabel(element: HTMLElement) {
  return (
    element.dataset.analyticsLabel ||
    element.getAttribute("aria-label") ||
    element.getAttribute("title") ||
    element.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) ||
    element.tagName.toLowerCase()
  );
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;
    track("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const element = event.target.closest<HTMLElement>("a, button");
      if (!element) return;

      const link = element instanceof HTMLAnchorElement ? element : null;
      track(link ? "link_click" : "button_click", {
        element_label: getLabel(element),
        link_url: link?.href || "",
        page_path: window.location.pathname,
      });
    }

    function handleSubmit(event: SubmitEvent) {
      if (!(event.target instanceof HTMLFormElement)) return;

      track("form_submit", {
        form_id: event.target.id || event.target.getAttribute("name") || "unnamed",
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
