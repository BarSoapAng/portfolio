import Link from "next/link";
import catJump from "@assets/cat-jump.gif";
import catWaving from "@assets/cat_waving.gif";
import leo from "@assets/leo.gif";
import star1 from "@assets/star1.gif";
import WorkExperienceStack from "@components/work/WorkExperienceStack";
import { type WorkSummary } from "@lib/work-shared";

type WorkIndexPageProps = {
  entries: WorkSummary[];
};

export default function WorkIndexPage({ entries }: WorkIndexPageProps) {
  return (
    <main className="px-4 py-6 text-[#1f2f40] sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-6">
          <section className="border-[3px] border-[#0d2743] bg-[#ff8ec8] p-1 font-mono shadow-[7px_7px_0_rgba(13,39,67,0.28)]">
            <div className="space-y-2 border-[3px] border-[#fff98a] bg-[#ffe9a3] p-3">
              <p className="animate-pulse text-center text-xs font-bold uppercase tracking-[0.12em] text-[#d7005f]">
                Work Zone: Hyper Archived
              </p>
              <div className="grid grid-cols-3 gap-1">
                <img src={catJump.src} alt="" className="h-14 w-full border-2 border-[#0d2743] bg-[#a7f3ff] object-contain" />
                <img src={star1.src} alt="" className="h-14 w-full border-2 border-[#0d2743] bg-[#a7f3ff] object-contain" />
                <img src={catWaving.src} alt="" className="h-14 w-full border-2 border-[#0d2743] bg-[#a7f3ff] object-contain" />
              </div>
              <div className="retro-marquee border-2 border-[#0d2743] bg-[#8ff0ff] py-1 text-[11px] uppercase tracking-[0.14em] text-[#0d2743]">
                <span>new role drops loaded from content/work | click cards to open logs |</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-[#0d2743] bg-white px-2 py-1 text-[12px] text-[#0d2743]">
                <img src={leo.src} alt="" className="h-7 w-7 object-contain" />
                <span>{entries.length} published experience files</span>
              </div>
            </div>
          </section>
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <section className="border-[3px] border-[#0d2743] bg-[#7ee8ff] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]">
            <div className="border-[3px] border-[#fff98a] bg-[#fff4bf] px-4 py-4">
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d7005f]">experience board.exe</p>
              <h1 className="mt-2 text-3xl leading-tight text-[#16324a]">Work</h1>
              <p className="mt-2 text-sm leading-6 text-[#204764]">
                Every card is generated from a file in <code>content/work</code>. Add or edit an MDX file and this board
                updates automatically.
              </p>
            </div>
          </section>

          {entries.length === 0 ? (
            <section className="border-[3px] border-[#0d2743] bg-[#fff4bf] p-4 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]">
              <p className="text-sm text-[#204764]">
                No work entries are published yet. Add files in <code>content/work</code> with <code>published: true</code>.
              </p>
            </section>
          ) : (
            <WorkExperienceStack entries={entries} />
          )}
        </div>
      </div>
    </main>
  );
}
