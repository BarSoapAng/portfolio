import type { ReactNode } from "react";
import Link from "next/link";
import catJump from "@assets/cat-jump.gif";
import catWaving from "@assets/cat_waving.gif";
import star1 from "@assets/star1.gif";
import star2 from "@assets/star2.gif";
import { formatWorkDate, type WorkSummary } from "@lib/work-shared";

type WorkPostPageProps = {
  entry: WorkSummary;
  children: ReactNode;
};

function Tag({ label }: { label: string }) {
  return (
    <span className="border-2 border-[#0c2b43] bg-[#ffe66a] px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-[#0c2b43]">
      {label}
    </span>
  );
}

export default function WorkPostPage({ entry, children }: WorkPostPageProps) {
  return (
    <main className="px-4 py-6 text-[#1e3043] sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            className="inline-flex border-2 border-[#0d2743] bg-[#7ee8ff] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#0d2743] [box-shadow:inset_2px_2px_0_#f7feff,inset_-2px_-2px_0_#187ca7] transition hover:bg-[#9aeeff]"
            href="/work"
          >
            Back to Work
          </Link>
          <span className="animate-pulse border-2 border-[#0d2743] bg-[#ffe66a] px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#0d2743]">
            y2k memory file
          </span>
        </div>

        <article className="border-[3px] border-[#0d2743] bg-[#ff9ed2] p-1 font-mono shadow-[7px_7px_0_rgba(13,39,67,0.25)]">
          <div className="border-[3px] border-[#fff98a] bg-[#fff6cf] px-4 py-4 sm:px-7 sm:py-6">
            <header className="space-y-4 border-b-2 border-dashed border-[#1f4864] pb-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#36546c]">
                    <span>{entry.company}</span>
                    <span>|</span>
                    <span>{entry.period}</span>
                    <span>|</span>
                    <span>{entry.location}</span>
                    <span>|</span>
                    <span>Filed {formatWorkDate(entry.date)}</span>
                  </div>

                  <h1 className="text-3xl leading-tight text-[#133651] sm:text-4xl">{entry.title}</h1>
                  <p className="max-w-3xl text-sm leading-6 text-[#284a63]">{entry.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <img src={catJump.src} alt="" className="h-14 w-14 border-2 border-[#0d2743] bg-[#9befff] object-contain" />
                  <img src={star1.src} alt="" className="h-14 w-14 border-2 border-[#0d2743] bg-[#9befff] object-contain" />
                  <img src={catWaving.src} alt="" className="h-14 w-14 border-2 border-[#0d2743] bg-[#9befff] object-contain" />
                  <img src={star2.src} alt="" className="h-14 w-14 border-2 border-[#0d2743] bg-[#9befff] object-contain" />
                </div>
              </div>
            </header>

            <div className="mdx-prose mdx-prose--work mt-6">{children}</div>
          </div>
        </article>
      </div>
    </main>
  );
}
