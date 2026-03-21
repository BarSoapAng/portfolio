"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

const TITLE_TO_STACK_GAP_PX = 10;

function Tag({ label }: { label: string }) {
  return (
    <span className="border-2 border-[#0c2b43] bg-[#ffe66a] px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-[#0c2b43]">
      {label}
    </span>
  );
}

function StackedWorkCard({ entry, index, total, topOffset, scrollYProgress }: StackedWorkCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseTilt = index % 2 === 0 ? -0.45 : 0.4;
  const step = total <= 0 ? 1 : 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step);

  const y = useTransform(scrollYProgress, [start, end], [0, -Math.min(64, index * 12)]);
  const rotate = useTransform(scrollYProgress, [start, end], [baseTilt, baseTilt * 0.1]);

  return (
    <motion.article
      className="sticky border-[3px] border-[#0d2743] bg-[#ffc4e6] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]"
      style={
        prefersReducedMotion
          ? { top: topOffset, rotate: baseTilt, zIndex: index + 1 }
          : { top: topOffset, y, rotate, transformOrigin: "center top", zIndex: index + 1 }
      }
    >
      <Link href={`/work/${entry.slug}`} className="block h-full">
        <div className="flex h-full flex-col gap-4 border-[3px] border-[#fff98a] bg-[#fff8d4] px-4 py-4">
          <div className="flex justify-between items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#415b6f]">
            <span>{entry.company}</span>
            <span>{entry.period}</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl leading-tight text-[#14344e] underline decoration-[#d7005f] underline-offset-4">
              {entry.title}
            </h2>
            <p className="text-sm leading-6 text-[#284a63]">{entry.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
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
  const [stackLeft, setStackLeft] = useState(0);

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
      const nextTitleHeight = titleNode.getBoundingClientRect().height;
      const nextStackLeft = stackNode.getBoundingClientRect().left;

      setTitleHeight(nextTitleHeight);
      setStackLeft(nextStackLeft);
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
  const bottomPaddingHeight = Math.max(0, Math.round(titleHeight + 30));

  return (
    <section ref={stackRef} className="relative flex min-w-0 flex-col overflow-visible">
      <div className="flex min-w-0 flex-col gap-7">
        {entries.map((entry, index) => (
          <StackedWorkCard
            key={entry.slug}
            entry={entry}
            index={index}
            total={entries.length}
            topOffset={cardTop}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
      <div className="mt-5 w-screen" style={{ marginLeft: -stackLeft }}>
        <SillyMarquee height={bottomPaddingHeight} />
      </div>
    </section>
  );
}
