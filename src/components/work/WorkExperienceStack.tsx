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
              <p className="work-entry__meta">
                <strong>{entry.company}</strong>
                <span>{entry.period}</span>
              </p>
              <h2>{entry.title}</h2>
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
