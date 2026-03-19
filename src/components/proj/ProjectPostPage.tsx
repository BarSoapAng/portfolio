import type { ReactNode } from "react";
import Link from "next/link";
import starOne from "@assets/star1.gif";
import starTwo from "@assets/star2.gif";
import { formatProjectDate, type ProjectSummary } from "@lib/project-shared";

type ProjectPostPageProps = {
  project: ProjectSummary;
  children: ReactNode;
};

function Tag({ label }: { label: string }) {
  return (
    <span className="retro-tag bg-paper-2">
      {label}
    </span>
  );
}

export default function ProjectPostPage({ project, children }: ProjectPostPageProps) {
  return (
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link className="retro-button retro-button-active" href="/proj">
            Back to proj index
          </Link>
          <span className="retro-tag">Project Log</span>
        </div>

        <article className="border-4 border-blue-1 bg-paper-1 p-1 shadow-retro-lg">
          <div className="border-2 border-blue-1 bg-cream-1">
            <header className="border-b-2 border-blue-1 bg-gradient-to-r from-blue-2 via-paper-1 to-cream-2 px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-blue-1">
                <span>{formatProjectDate(project.date)}</span>
                <span>🧃</span>
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              <h1 className="mt-3 text-3xl leading-tight text-gray-2 sm:text-4xl">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-1">{project.summary}</p>
            </header>

            <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="space-y-2 border-2 border-blue-1 bg-paper-2 p-3 text-xs uppercase tracking-[0.1em] text-blue-1">
                <p className="m-0">status: archived + documented</p>
                <p className="m-0">source: content/project/{project.slug}.mdx</p>
                <div className="flex items-center gap-2 pt-1">
                  <img src={starOne.src} alt="" className="w-5" />
                  <img src={starTwo.src} alt="" className="w-5" />
                  <span>emoji-grade chaos</span>
                </div>
              </aside>

              <div className="project-prose min-w-0">{children}</div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
