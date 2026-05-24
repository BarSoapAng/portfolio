import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import catJump from "@assets/home/cat-jump.gif";
import catWaving from "@assets/home/cat_waving.gif";
import star1 from "@assets/star1.gif";
import star2 from "@assets/star2.gif";
import TagLabel from "@components/ui/TagLabel";
import { buildWorkMetadata, getAllWorkSlugs, getWorkBySlug } from "@lib/work";
import { formatWorkDate } from "@lib/work-shared";

type WorkPostRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    notFound();
  }

  return buildWorkMetadata(entry);
}

export default async function WorkPostRoute({ params }: WorkPostRouteProps) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { default: WorkContent } = await import(`../../../../content/work/${slug}.mdx`);

  return (
    <div className="px-3 py-4 text-gray-2 sm:px-6 sm:py-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            className="inline-flex border-2 border-gray-2 bg-blue-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition hover:-translate-y-0.5 hover:bg-blue-2/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-1 focus-visible:ring-offset-2"
            href="/work"
          >
            ← Back to work
          </Link>
          <span className="animate-pulse border-2 border-gray-2 bg-sand-2 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black-1">
            y2k memory file
          </span>
        </div>

        <article className="border-2 border-gray-2 bg-paper-1 p-1 font-mono shadow-retro-lg">
          <div className="border-2 border-pink-1 bg-cream-1 px-3 py-3 sm:px-7 sm:py-6">
            <header className="space-y-4 border-b-2 border-dashed border-pink-1/60 pb-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-sand-1">
                    <span className="font-bold">{entry.company}</span>
                    <span aria-hidden>•</span>
                    <span>{entry.period}</span>
                    <span aria-hidden>•</span>
                    <span>Filed {formatWorkDate(entry.date)}</span>
                  </div>

                  <h1 className="text-2xl leading-tight text-gray-2 sm:text-3xl md:text-4xl">
                    {entry.title}
                  </h1>
                  <p className="max-w-3xl text-sm leading-6 text-gray-1">{entry.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <TagLabel
                        key={tag}
                        className="inline-block border-2 border-gray-2 bg-sand-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-black-1"
                        label={tag}
                      />
                    ))}
                  </div>
                </div>

                <div className="hidden shrink-0 grid-cols-2 gap-1 sm:grid">
                  <img
                    src={catJump.src}
                    alt=""
                    className="h-12 w-12 border-2 border-gray-2 bg-blue-2 object-contain md:h-14 md:w-14"
                  />
                  <img
                    src={star1.src}
                    alt=""
                    className="h-12 w-12 border-2 border-gray-2 bg-blue-2 object-contain md:h-14 md:w-14"
                  />
                  <img
                    src={catWaving.src}
                    alt=""
                    className="h-12 w-12 border-2 border-gray-2 bg-blue-2 object-contain md:h-14 md:w-14"
                  />
                  <img
                    src={star2.src}
                    alt=""
                    className="h-12 w-12 border-2 border-gray-2 bg-blue-2 object-contain md:h-14 md:w-14"
                  />
                </div>
              </div>
            </header>

            <div className="mdx-prose mdx-prose--work mt-6">
              <WorkContent />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
