import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import starOne from "@assets/star1.gif";
import starTwo from "@assets/star2.gif";
import TagLabel from "@components/ui/TagLabel";
import { buildProjectMetadata, getAllProjectSlugs, getProjectBySlug } from "@lib/project";
import { formatProjectDate } from "@lib/project-shared";

type ProjectRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return buildProjectMetadata(project);
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { default: ProjectContent } = await import(`../../../../content/project/${slug}.mdx`);

  return (
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            className="inline-flex border-2 border-gray-2 bg-blue-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition hover:-translate-y-0.5 hover:bg-blue-2/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-1 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2"
            href="/proj"
          >
            ← Back to proj index
          </Link>
          <span className="border-2 border-sand-1 bg-paper-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-sand-1">
            Project Log
          </span>
        </div>

        <article className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-lg">
          <div className="border-2 border-blue-1 bg-cream-1">
            <header className="border-b-2 border-blue-1 bg-gradient-to-r from-blue-2 via-paper-1 to-cream-2 px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-blue-1">
                <span>{formatProjectDate(project.date)}</span>
                <span aria-hidden className="text-orange-1">
                  🧃
                </span>
                {project.tags.map((tag) => (
                  <TagLabel key={tag} label={tag} />
                ))}
              </div>
              <h1 className="mt-3 text-3xl leading-tight text-gray-2 sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-1">
                {project.summary}
              </p>
            </header>

            <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="space-y-2 border-2 border-blue-1 bg-paper-2 p-3 text-[11px] uppercase tracking-[0.1em] text-blue-1">
                <p className="m-0 font-bold">status:</p>
                <p className="m-0">archived + documented</p>
                <p className="m-0 mt-2 font-bold">source:</p>
                <p className="m-0 normal-case tracking-normal text-gray-1">
                  content/project/{project.slug}.mdx
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <img src={starOne.src} alt="" className="w-5" />
                  <img src={starTwo.src} alt="" className="w-5" />
                  <span>emoji-grade chaos</span>
                </div>
              </aside>

              <div className="mdx-prose mdx-prose--project min-w-0">
                <ProjectContent />
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
