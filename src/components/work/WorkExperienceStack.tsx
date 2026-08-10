import Link from "next/link";
import { type WorkSummary } from "@lib/work-shared";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
};

export default function WorkExperienceStack({ entries }: WorkExperienceStackProps) {
  return (
    <section>
      {entries.length === 0 ? (
        <p>
          No work entries yet - add MDX files to <code>content/work</code>.
        </p>
      ) : (
        entries.map((entry) => (
          <article key={entry.slug}>
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
          </article>
        ))
      )}
    </section>
  );
}
