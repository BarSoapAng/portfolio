import Link from "next/link";
import starOne from "@assets/star1.gif";
import starTwo from "@assets/star2.gif";
import catWaving from "@assets/home/cat_waving.gif";
import TagLabel from "@components/ui/TagLabel";
import { formatProjectDate, type ProjectSummary } from "@lib/project-shared";

type ProjectIndexPageProps = {
  projects: ProjectSummary[];
};

const CARD_EMOJIS = ["🪩", "💾", "🕹️", "🍓", "📼", "🎧"];
const PROJECT_MARQUEE_TEXT =
  "SUPER COOL PROJECTS | 10% OFF ENTIRE STORE | LOL IDK WHAT TO PUT HERE BUT I REALLY WANTED TO INCORPORATE THIS EFFECT | ARE YOU HAVING FUN? | I'D LOVE TO CHAT WITH YOU! |";

function EmptyState() {
  return (
    <article className="border-4 border-blue-1 bg-paper-1 p-1 shadow-retro-lg">
      <div className="border-2 border-blue-1 bg-cream-1 px-4 py-5">
        <h2 className="text-2xl text-blue-1">No projects yet</h2>
        <p className="mt-2 text-sm leading-6 text-gray-1">
          Add <code>.mdx</code> files inside <code>content/project</code> with frontmatter fields:
          <code> title</code>, <code>date</code>, <code>summary</code>, <code>published</code>, and <code>tags</code>.
        </p>
      </div>
    </article>
  );
}

export default function ProjectIndexPage({ projects }: ProjectIndexPageProps) {
  return (
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <section className="border-4 border-blue-1 bg-paper-1 p-1 shadow-retro-lg">
          <div className="grid items-center gap-3 border-2 border-blue-1 bg-gradient-to-r from-cream-2 via-paper-1 to-blue-2 px-4 py-4 md:grid-cols-[56px_minmax(0,1fr)_96px]">
            <img src={starOne.src} alt="" className="w-12 animate-bounce" />
            <div>
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-1">
                Project Index 2003.exe
              </p>
              <h1 className="mt-2 text-3xl leading-tight text-gray-2 sm:text-4xl">
                Proj Lab <span aria-hidden>🪐🎀🛠️</span>
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-1">
                This page auto-builds from local MDX files in <code>content/project</code>. Each card opens a full
                project page with its own long-form writeup.
              </p>
            </div>
            <div className="justify-self-start md:justify-self-end">
              <img src={catWaving.src} alt="Waving cat gif" className="w-20 border-2 border-blue-1 bg-paper-1 p-1" />
            </div>
          </div>
        </section>
        <div className="retro-marquee border-2 border-[#0d2743] bg-[#8ff0ff] py-1 text-[11px] uppercase tracking-[0.14em] text-[#0d2743]">
          <div className="retro-marquee-wrap-track">
            <span className="retro-marquee-wrap-item">{PROJECT_MARQUEE_TEXT}</span>
            <span className="retro-marquee-wrap-item" aria-hidden="true">
              {PROJECT_MARQUEE_TEXT}
            </span>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <section className="space-y-4">
            {projects.length === 0 ? <EmptyState /> : null}

            {projects.map((project, index) => (
              <article
                key={project.slug}
                className="border-4 border-blue-1 bg-paper-1 p-1 shadow-retro-lg"
              >
                <div className="flex h-full flex-col gap-4 border-2 border-blue-1 bg-cream-1 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-blue-1">
                    <span>{formatProjectDate(project.date)}</span>
                    <span>{CARD_EMOJIS[index % CARD_EMOJIS.length]}</span>
                    {project.tags.map((tag) => (
                      <TagLabel
                        key={tag}
                        className="border border-sand-1 bg-paper-2 px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-sand-1"
                        label={tag}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl leading-tight text-gray-2 sm:text-3xl">
                      <Link className="underline decoration-orange-1 underline-offset-4" href={`/proj/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="max-w-3xl text-sm leading-6 text-gray-1">{project.summary}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      className="inline-flex border-2 border-gray-2 bg-blue-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition hover:bg-blue-2/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-1 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2"
                      href={`/proj/${project.slug}`}
                    >
                      Open project page
                    </Link>
                    <img src={index % 2 === 0 ? starTwo.src : starOne.src} className="w-6" alt="" />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="border-4 border-blue-1 bg-paper-1 p-1 lg:sticky lg:top-6">
            <div className="space-y-2 border-2 border-blue-1 bg-cream-1 p-3 text-sm text-gray-1">
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-1">Directory Feed</p>
              <p className="m-0">Projects online: {projects.length} 🎉</p>
              <p className="m-0">Format: local MDX logs + custom descriptions 📓</p>
              <p className="m-0">Vibe: loud colors, gifs, and tiny chaos ✨</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
