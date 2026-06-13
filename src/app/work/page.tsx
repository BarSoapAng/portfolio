import type { Metadata } from "next";
import typing_yay from "@assets/work/typing_yay.gif";
import typing_nah from "@assets/work/typing_nay.gif";
import WorkExperienceStack from "@components/work/WorkExperienceStack";
import { getAllWorkEntries } from "@lib/work";

export const metadata: Metadata = {
  title: "Work | Angela's Universe",
  description: "A janky retro timeline of work experiences, built from local MDX files.",
};

export default function WorkPage() {
  const entries = getAllWorkEntries();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 px-3 py-4 sm:px-6 sm:py-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <section className="border-2 border-gray-2 bg-paper-1 p-1 font-mono shadow-retro-lg">
          <div className="space-y-2 border-2 border-pink-1 bg-cream-1 p-3">
            <p className="m-0 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-pink-1">
              click cards for details
            </p>
            <img
              src={typing_nah.src}
              alt="A pixel character typing furiously"
              className="mx-auto w-full max-w-[260px] border-2 border-gray-2 bg-blue-2 object-contain lg:max-w-none"
            />
            <div className="flex items-center gap-3 border-2 border-gray-2 bg-paper-1 px-3 py-1.5 text-xs">
              <img src={typing_yay.src} alt="" className="h-7 w-7 shrink-0 object-contain" />
              <span className="font-semibold uppercase tracking-wider text-gray-2">
                {entries.length} {entries.length === 1 ? "role" : "roles"} explored
              </span>
            </div>
          </div>
        </section>
      </aside>

      <section>
        <section className="sticky top-4 z-30 border-2 border-gray-2 bg-paper-1 p-1 font-mono shadow-retro-md sm:top-6">
          <div className="border-2 border-blue-1 bg-cream-1 px-3 py-3 sm:px-4 sm:py-4">
            <p className="m-0 animate-pulse text-[10px] font-bold uppercase tracking-[0.2em] text-pink-1 sm:text-[11px]">
              Check it out
            </p>
            <h1 className="mt-2 text-2xl leading-tight text-gray-2 sm:text-3xl">
              Experiences
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-1">
              Where I&apos;ve worked and where I&apos;m working now!
            </p>
          </div>
        </section>
        <WorkExperienceStack entries={entries} />
      </section>
    </div>
  );
}
