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
              <h2>
                {entry.title} - {entry.company}
              </h2>
              <p className="work-entry__meta">{entry.period}</p>
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
