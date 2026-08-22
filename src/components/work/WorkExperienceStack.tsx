import { ContentCardBody, ContentIndex, EntryTags } from "@components/ui/ContentStyles";
import { type WorkSummary } from "@lib/work-shared";
import {
  Company,
  WorkEntry,
  WorkHeading,
  WorkMeta,
  WorkTitle,
} from "./WorkExperienceStack.styles";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
};

export default function WorkExperienceStack({ entries }: WorkExperienceStackProps) {
  return (
    <ContentIndex>
      {entries.length === 0 ? (
        <p>
          No work entries yet - add MDX files to <code>content/work</code>.
        </p>
      ) : (
        entries.map((entry) => (
          <WorkEntry key={entry.slug}>
            <ContentCardBody>
              <WorkHeading>
                <WorkTitle>
                  <h2>{entry.title}</h2>
                  <Company>- {entry.company}</Company>
                </WorkTitle>
                <WorkMeta>{entry.period}</WorkMeta>
              </WorkHeading>
              <p>
                <EntryTags>{entry.tags.join(" · ")}</EntryTags>
              </p>
            </ContentCardBody>
          </WorkEntry>
        ))
      )}
    </ContentIndex>
  );
}
