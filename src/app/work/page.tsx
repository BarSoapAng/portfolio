import type { Metadata } from "next";
import typing_yay from "@assets/work/typing_yay.gif";
import typing_nah from "@assets/work/typing_nay.gif"
import WorkExperienceStack from "@components/work/WorkExperienceStack";
import { getAllWorkEntries } from "@lib/work";

export const metadata: Metadata = {
  title: "Work | Angela's Universe",
  description: "A janky retro timeline of work experiences, built from local MDX files.",
};

export default function WorkPage() {
  const entries = getAllWorkEntries();

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
      <aside className="lg:sticky lg:top-0 lg:self-start">
        <section className="border-[3px] border-[#0d2743] bg-[#ff8ec8] p-1 font-mono shadow-[7px_7px_0_rgba(13,39,67,0.28)]">
          <div className="space-y-2 border-[3px] border-[#fff98a] bg-[#ffe9a3] p-3">
            <p className="text-center text-xs font-bold uppercase tracking-[0.12em] text-[#d7005f] mb-4">
              click cards for details
            </p>
            <img
              src={typing_nah.src}
              alt=""
              className="w-full border-2 border-black bg-blue-300 object-contain"
            />
            <div className="flex items-center gap-4 border-2 border-black bg-white px-2 py-1 text-[12px]">
              <img src={typing_yay.src} alt="" className="h-7 w-7 object-contain" />
              <span className="uppercase">{entries.length} roles explored</span>
            </div>
          </div>
        </section>
      </aside>

      <section>
        <section className="sticky top-0 z-40 border-[3px] border-[#0d2743] bg-[#7ee8ff] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]">
          <div className="border-[3px] border-[#fff98a] bg-[#fff4bf] px-4 py-4">
            <p className="animate-pulse m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d7005f]">Check it out</p>
            <h1 className="mt-2 text-3xl leading-tight text-[#16324a]">Experiences</h1>
            <p className="mt-2 text-sm leading-6 text-[#204764]">
              Where I've worked and working at!
            </p>
          </div>
        </section>
        <WorkExperienceStack entries={entries} />
      </section>
    </main>
  );
}
