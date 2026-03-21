"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import star1 from "@assets/star1.gif";
import star2 from "@assets/star2.gif";
import SillyMarquee from "@components/work/SillyMarquee";
import { formatWorkDate, type WorkSummary } from "@lib/work-shared";

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

const TITLE_TO_STACK_GAP_PX = 22;

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
      <div className="flex h-full flex-col gap-4 border-[3px] border-[#fff98a] bg-[#fff8d4] px-4 py-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#415b6f]">
          <span>{entry.company}</span>
          <span>|</span>
          <span>{entry.period}</span>
          <span>|</span>
          <span>{entry.location}</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl leading-tight text-[#14344e]">
            <Link className="underline decoration-[#d7005f] underline-offset-4" href={`/work/${entry.slug}`}>
              {entry.title}
            </Link>
          </h2>
          <p className="text-sm leading-6 text-[#284a63]">{entry.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#415b6f]">Filed {formatWorkDate(entry.date)}</span>
          <div className="flex items-center gap-2">
            <img src={index % 2 === 0 ? star1.src : star2.src} alt="" className="h-6 w-6 object-contain" />
            <Link
              className="inline-flex border-2 border-[#0d2743] bg-[#7ee8ff] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#0d2743] [box-shadow:inset_2px_2px_0_#f7feff,inset_-2px_-2px_0_#187ca7] transition hover:bg-[#97eeff]"
              href={`/work/${entry.slug}`}
            >
              Open File
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function WorkExperienceStack({ entries }: WorkExperienceStackProps) {
  const stackRef = useRef<HTMLElement | null>(null);
  const [titleHeight, setTitleHeight] = useState(0);

  useEffect(() => {
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

      setTitleHeight(nextTitleHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(titleNode);
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
  const bottomPaddingHeight = Math.max(0, Math.round(titleHeight - 6));

  return (
    <section ref={stackRef} className="relative flex min-w-0 flex-col">
      <div className="flex min-w-0 flex-col gap-12">
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
      <SillyMarquee height={bottomPaddingHeight} />
    </section>
  );
}
