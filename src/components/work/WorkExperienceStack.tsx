"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import star1 from "@assets/star1.gif";
import star2 from "@assets/star2.gif";
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

const TITLE_TOP_OFFSET_PX = 16;
const TITLE_TO_STACK_GAP_PX = 12;
const DEFAULT_TITLE_HEIGHT_PX = 172;

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
  const step = total <= 1 ? 1 : 1 / (total + 1);
  const start = index * step;
  const end = Math.min(1, start + step * 1.15);
  const finalScale = 1 - Math.min(0.24, index * 0.04);

  const y = useTransform(scrollYProgress, [start, end], [0, -Math.min(64, index * 12)]);
  const scale = useTransform(scrollYProgress, [start, end], [1, finalScale]);
  const rotate = useTransform(scrollYProgress, [start, end], [baseTilt, baseTilt * 0.1]);

  return (
    <motion.article
      className="sticky border-[3px] border-[#0d2743] bg-[#ffc4e6] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]"
      style={
        prefersReducedMotion
          ? { top: topOffset, rotate: baseTilt, zIndex: index + 1 }
          : { top: topOffset, y, scale, rotate, transformOrigin: "center top", zIndex: index + 1 }
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
  const titleRef = useRef<HTMLElement | null>(null);
  const [titleHeight, setTitleHeight] = useState(DEFAULT_TITLE_HEIGHT_PX);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      setTitleHeight(node.getBoundingClientRect().height);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 0.95", "end 0.35"],
  });
  const cardTop = titleHeight + TITLE_TOP_OFFSET_PX + TITLE_TO_STACK_GAP_PX;

  return (
    <section ref={stackRef} className="relative flex min-w-0 flex-col gap-4 pb-[45vh]">
      <section
        ref={titleRef}
        className="sticky top-4 z-40 border-[3px] border-[#0d2743] bg-[#7ee8ff] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]"
      >
        <div className="border-[3px] border-[#fff98a] bg-[#fff4bf] px-4 py-4">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d7005f]">experience board.exe</p>
          <h1 className="mt-2 text-3xl leading-tight text-[#16324a]">Work</h1>
          <p className="mt-2 text-sm leading-6 text-[#204764]">
            Every card is generated from a file in <code>content/work</code>. Add or edit an MDX file and this board
            updates automatically.
          </p>
        </div>
      </section>

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
    </section>
  );
}
