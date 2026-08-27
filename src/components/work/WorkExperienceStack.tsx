import { ContentCardBody, ContentIndex, EntryTags } from "@components/ui/ContentStyles";
import { type WorkSummary } from "@lib/work-shared";
import {
  WorkEntry,
  WorkHeading,
  Company,
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
                <h2>{entry.title}</h2>
                <EntryTags>{entry.period}</EntryTags>
              </WorkHeading>
              <Company>{entry.company}</Company>
            </ContentCardBody>
          </WorkEntry>
        ))
      )}
    </ContentIndex>
  );
}
