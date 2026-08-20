import Link from "next/link";
import ContentImage from "@components/ui/ContentImage";
import { type WorkSummary } from "@lib/work-shared";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
};

export default function WorkExperienceStack({ entries }: WorkExperienceStackProps) {
  return (
    <section className="content-index">
      {entries.length === 0 ? (
        <p>
          No work entries yet - add MDX files to <code>content/work</code>.
        </p>
      ) : (
        entries.map((entry) => (
          <article className="content-card" key={entry.slug}>
            <Link aria-label={`View ${entry.title} at ${entry.company}`} href={`/work/${entry.slug}`}>
              <ContentImage alt={entry.thumbnailAlt} src={entry.thumbnail} variant="thumbnail" />
            </Link>
            <div className="content-card__body">
              <p>
                <strong>{entry.company}</strong> {entry.period}
              </p>
              <h2>
                <Link href={`/work/${entry.slug}`}>{entry.title}</Link>
              </h2>
              <p>{entry.summary}</p>
              <p>
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag} </span>
                ))}
              </p>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
