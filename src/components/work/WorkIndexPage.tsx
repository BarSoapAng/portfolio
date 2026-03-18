import Link from "next/link";
import catJump from "@assets/cat-jump.gif";
import catWaving from "@assets/cat_waving.gif";
import leo from "@assets/leo.gif";
import star1 from "@assets/star1.gif";
import star2 from "@assets/star2.gif";
import { formatWorkDate, type WorkSummary } from "@lib/work-shared";

type WorkIndexPageProps = {
  entries: WorkSummary[];
};

function Tag({ label }: { label: string }) {
  return (
    <span className="border-2 border-[#0c2b43] bg-[#ffe66a] px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-[#0c2b43]">
      {label}
    </span>
  );
}

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
            <section className="grid gap-4">
              {entries.map((entry, index) => (
                <article
                  key={entry.slug}
                  className={[
                    "border-[3px] border-[#0d2743] bg-[#ffc4e6] p-1 font-mono shadow-[6px_6px_0_rgba(13,39,67,0.2)]",
                    index % 2 === 0 ? "-rotate-[0.45deg]" : "rotate-[0.4deg]",
                  ].join(" ")}
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
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[#415b6f]">
                        Filed {formatWorkDate(entry.date)}
                      </span>
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
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
