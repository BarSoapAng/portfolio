"use client";

import { useLayoutEffect, useRef, useState, type Ref } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SillyMarquee from "@components/work/SillyMarquee";
import { type WorkSummary } from "@lib/work-shared";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
};

type StackedWorkCardProps = {
  entry: WorkSummary;
  index: number;
  topOffset: number;
  isStacking: boolean;
  cardRef?: Ref<HTMLElement>;
};

const MIN_BOTTOM_PADDING_PX = 200;
const STACKING_BREAKPOINT_PX = 768; // matches Tailwind `md`

function findScrollViewport(node: HTMLElement | null): HTMLElement | null {
  let current = node?.parentElement ?? null;
  while (current && current !== document.body) {
    const overflowY = window.getComputedStyle(current).overflowY;
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block border-2 border-gray-2 bg-cream-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-2">
      {label}
    </span>
  );
}

function StackedWorkCard({ entry, index, topOffset, isStacking, cardRef }: StackedWorkCardProps) {
  const prefersReducedMotion = useReducedMotion();
  // Static tilt keeps the pile hand-placed while every sticky card shares
  // the first card's resting top position.
  const baseTilt = index % 2 === 0 ? -0.5 : 0.45;

  return (
    <motion.article
      ref={cardRef}
      className="border-2 border-gray-2 bg-paper-1 p-1 font-mono shadow-retro-md transition-[transform,box-shadow] duration-200 hover:shadow-retro-lg md:sticky md:hover:-translate-y-0.5"
      style={{
        // Sticky only applies when position: sticky is set by md:sticky.
        // Setting top on a static element is a no-op, so it is safe at all sizes.
        top: isStacking ? topOffset : undefined,
        transform: prefersReducedMotion ? undefined : `rotate(${baseTilt}deg)`,
        zIndex: index + 1,
        transformOrigin: "center top",
      }}
    >
      <Link
        href={`/work/${entry.slug}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-1 focus-visible:ring-offset-2"
      >
        <div className="flex h-full flex-col gap-3 border-2 border-pink-1 bg-cream-1 px-4 py-4 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.12em] text-sand-1 sm:text-[11px]">
            <span className="font-bold">{entry.company}</span>
            <span>{entry.period}</span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xl leading-tight text-gray-2 decoration-pink-1 underline-offset-4 hover:underline sm:text-2xl">
              {entry.title}
            </h2>
            <p className="text-sm leading-6 text-gray-1">{entry.summary}</p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function WorkExperienceStack({ entries }: WorkExperienceStackProps) {
  const stackRef = useRef<HTMLElement | null>(null);
  const firstCardRef = useRef<HTMLElement | null>(null);
  const lastCardRef = useRef<HTMLElement | null>(null);
  const [cardTop, setCardTop] = useState(0);
  const [lastCardHeight, setLastCardHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isStacking, setIsStacking] = useState(false);

  useLayoutEffect(() => {
    const stackNode = stackRef.current;
    if (!stackNode) return;

    const titleNode = stackNode.previousElementSibling;
    if (!(titleNode instanceof HTMLElement)) return;

    const scrollViewport = findScrollViewport(stackNode);

    const measure = () => {
      const viewportTop = scrollViewport?.getBoundingClientRect().top ?? 0;
      const firstCardTop = firstCardRef.current
        ? firstCardRef.current.getBoundingClientRect().top - viewportTop
        : titleNode.getBoundingClientRect().height;

      setCardTop(Math.max(0, Math.round(firstCardTop)));
      setLastCardHeight(Math.round(lastCardRef.current?.getBoundingClientRect().height ?? 0));
      const height = scrollViewport?.clientHeight ?? window.innerHeight;
      setViewportHeight(height);
      setIsStacking(window.innerWidth >= STACKING_BREAKPOINT_PX);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(titleNode);
    observer.observe(stackNode);
    if (firstCardRef.current) observer.observe(firstCardRef.current);
    if (lastCardRef.current) observer.observe(lastCardRef.current);
    if (scrollViewport) observer.observe(scrollViewport);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // When stacking, the section needs enough trailing scroll room for the
  // last sticky card to reach the same top offset as the first card, then stop.
  const exactStackEndSpacer = Math.max(0, viewportHeight - cardTop - lastCardHeight);
  const bottomPaddingHeight = isStacking
    ? exactStackEndSpacer
    : MIN_BOTTOM_PADDING_PX;

  return (
    <section ref={stackRef} className="relative flex min-w-0 flex-col overflow-visible">
      <div className="flex min-w-0 flex-col gap-5 pt-4 sm:gap-7">
        {entries.length === 0 ? (
          <article className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
            <div className="border-2 border-sand-1 bg-cream-1 px-4 py-5 text-sm text-gray-1">
              No work entries yet - add MDX files to <code>content/work</code>.
            </div>
          </article>
        ) : (
          entries.map((entry, index) => (
            <StackedWorkCard
              key={entry.slug}
              entry={entry}
              index={index}
              topOffset={cardTop}
              isStacking={isStacking}
              cardRef={(node) => {
                if (index === 0) firstCardRef.current = node;
                if (index === entries.length - 1) lastCardRef.current = node;
              }}
            />
          ))
        )}
      </div>
      <div
        className={[
          "overflow-hidden bg-paper-1/40",
          isStacking ? "" : "mt-6 border-y-2 border-gray-2",
        ].join(" ")}
      >
        <SillyMarquee height={bottomPaddingHeight} />
      </div>
    </section>
  );
}
