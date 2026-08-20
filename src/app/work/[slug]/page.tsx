import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import catJump from "@assets/home/cat-jump.gif";
import catWaving from "@assets/home/cat_waving.gif";
import ContentImage from "@components/ui/ContentImage";
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
    <main>
      <p>
        <Link href="/home#work">← Back to work</Link>{" "}
        <span>y2k memory file</span>
      </p>

      <article>
        <header className="content-detail-header">
          <p>
            <strong>{entry.company}</strong> <span aria-hidden>•</span> {entry.period}{" "}
            <span aria-hidden>•</span> Filed {formatWorkDate(entry.date)}
          </p>
          <h1>{entry.title}</h1>
          <p>{entry.summary}</p>
          <p>
            {entry.tags.map((tag) => (
              <TagLabel key={tag} label={tag} />
            ))}
          </p>
          <div aria-hidden className="content-detail-gifs">
            <img alt="" src={catJump.src} />
            <img alt="" src={catWaving.src} />
          </div>
        </header>

        <figure className="content-hero">
          <ContentImage alt={entry.thumbnailAlt} src={entry.thumbnail} variant="hero" />
        </figure>

        <WorkContent />
      </article>
    </main>
  );
}
