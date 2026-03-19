"use client";

import { useRef } from "react";
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
  scrollYProgress: MotionValue<number>;
};

function Tag({ label }: { label: string }) {
  return (
    <span className="border-2 border-[#0c2b43] bg-[#ffe66a] px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-[#0c2b43]">
      {label}
    </span>
  );
}

function StackedWorkCard({ entry, index, total, scrollYProgress }: StackedWorkCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseTilt = index % 2 === 0 ? -0.45 : 0.4;
  const start = total <= 1 ? 0 : index / total;
  const end = Math.min(1, start + 0.35);

  const y = useTransform(scrollYProgress, [start, end], [0, -Math.min(28, index * 8)]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 1 - Math.min(0.14, index * 0.03)]);
  const rotate = useTransform(scrollYProgress, [start, end], [baseTilt, baseTilt * 0.35]);

  return (
    <motion.article
      className="sticky top-4 border-[3px] border-[#0d2743] bg-[#ffc4e6] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]"
      style={
        prefersReducedMotion
          ? { rotate: baseTilt, zIndex: index + 1 }
          : { y, scale, rotate, transformOrigin: "center top", zIndex: index + 1 }
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
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 0.9", "end end"],
  });

  return (
    <section ref={stackRef} className="relative flex min-w-0 flex-col gap-4">
      {entries.map((entry, index) => (
        <StackedWorkCard
          key={entry.slug}
          entry={entry}
          index={index}
          total={entries.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  );
}
