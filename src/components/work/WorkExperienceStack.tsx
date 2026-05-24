"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SillyMarquee from "@components/work/SillyMarquee";
import { type WorkSummary } from "@lib/work-shared";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
};

type StackedWorkCardProps = {
  entry: WorkSummary;
  index: number;
  total: number;
  topOffset: number;
  scrollYProgress: MotionValue<number>;
};

const TITLE_TO_STACK_GAP_PX = 12;

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block border-2 border-gray-2 bg-cream-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-2">
      {label}
    </span>
  );
}

function StackedWorkCard({
  entry,
  index,
  total,
  topOffset,
  scrollYProgress,
}: StackedWorkCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseTilt = index % 2 === 0 ? -0.4 : 0.35;
  const step = total <= 0 ? 1 : 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step);

  const y = useTransform(scrollYProgress, [start, end], [0, -Math.min(48, index * 10)]);
  const rotate = useTransform(scrollYProgress, [start, end], [baseTilt, baseTilt * 0.1]);

  return (
    <motion.article
      className="sticky border-2 border-gray-2 bg-paper-1 p-1 font-mono shadow-retro-md transition-shadow hover:shadow-retro-lg"
      style={
        prefersReducedMotion
          ? { top: topOffset, rotate: baseTilt, zIndex: index + 1 }
          : { top: topOffset, y, rotate, transformOrigin: "center top", zIndex: index + 1 }
      }
    >
      <Link
        href={`/work/${entry.slug}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-1 focus-visible:ring-offset-2"
      >
        <div className="flex h-full flex-col gap-4 border-2 border-pink-1 bg-cream-1 px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.12em] text-sand-1">
            <span className="font-bold">{entry.company}</span>
            <span>{entry.period}</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl leading-tight text-gray-2 decoration-pink-1 underline-offset-4 hover:underline">
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
  const [titleHeight, setTitleHeight] = useState(0);

  useLayoutEffect(() => {
    const stackNode = stackRef.current;
    if (!stackNode) {
      return;
    }

    const titleNode = stackNode.previousElementSibling;
    if (!(titleNode instanceof HTMLElement)) {
      return;
    }

    const measure = () => {
      setTitleHeight(titleNode.getBoundingClientRect().height);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(titleNode);
    observer.observe(stackNode);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const cardTop = titleHeight + TITLE_TO_STACK_GAP_PX;
  const bottomPaddingHeight = Math.max(200, Math.round(titleHeight + 30));

  return (
    <section ref={stackRef} className="relative flex min-w-0 flex-col overflow-visible">
      <div className="flex min-w-0 flex-col gap-7 pt-4">
        {entries.length === 0 ? (
          <article className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
            <div className="border-2 border-sand-1 bg-cream-1 px-4 py-5 text-sm text-gray-1">
              No work entries yet — add MDX files to <code>content/work</code>.
            </div>
          </article>
        ) : (
          entries.map((entry, index) => (
            <StackedWorkCard
              key={entry.slug}
              entry={entry}
              index={index}
              total={entries.length}
              topOffset={cardTop}
              scrollYProgress={scrollYProgress}
            />
          ))
        )}
      </div>
      <div className="mt-6 overflow-hidden border-y-2 border-gray-2 bg-paper-1/40">
        <SillyMarquee height={bottomPaddingHeight} />
      </div>
    </section>
  );
}
