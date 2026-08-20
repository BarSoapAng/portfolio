import Link from "next/link";
import { type WorkSummary } from "@lib/work-shared";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
};

export default function WorkExperienceStack({ entries }: WorkExperienceStackProps) {
  return (
    <div className="content-index">
      {entries.length === 0 ? (
        <p>
          No work entries yet - add MDX files to <code>content/work</code>.
        </p>
      ) : (
        entries.map((entry) => (
          <article className="work-entry" key={entry.slug}>
            <div className="content-card__body">
              <p>
                <strong>{entry.company}</strong> {entry.period}
              </p>
              <h2>
                <Link href={`/work/${entry.slug}`}>{entry.title}</Link>
              </h2>
              <p>
                <span className="entry-tags">{entry.tags.join(" · ")}</span>
              </p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
