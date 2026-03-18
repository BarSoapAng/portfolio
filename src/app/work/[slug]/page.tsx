import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WorkPostPage from "@components/work/WorkPostPage";
import { buildWorkMetadata, getAllWorkSlugs, getWorkBySlug } from "@lib/work";

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
    <WorkPostPage entry={entry}>
      <WorkContent />
    </WorkPostPage>
  );
}
