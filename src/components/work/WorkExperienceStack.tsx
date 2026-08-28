import { Fragment, type ReactNode } from "react";
import { ContentCardBody, EntryTags } from "@components/ui/ContentStyles";
import { type WorkSummary } from "@lib/work-shared";
import {
  WorkEntry,
  WorkHeading,
  Company,
  WorkIndex,
} from "./WorkExperienceStack.styles";

type WorkExperienceStackProps = {
  entries: WorkSummary[];
  renderConnector?: (index: number) => ReactNode;
};

export default function WorkExperienceStack({
  entries,
  renderConnector,
}: WorkExperienceStackProps) {
  return (
    <WorkIndex>
      {entries.length === 0 ? (
        <p>
          No work entries yet - add them to <code>content/work.json</code>.
        </p>
      ) : (
        entries.map((entry, index) => (
          <Fragment key={`${entry.company}-${entry.title}-${entry.period}`}>
            <WorkEntry>
              <ContentCardBody>
                <WorkHeading>
                  <h2>{entry.title}</h2>
                  <EntryTags>{entry.period}</EntryTags>
                </WorkHeading>
                <Company>{entry.company}</Company>
              </ContentCardBody>
            </WorkEntry>
            {index < entries.length - 1 ? renderConnector?.(index) : null}
          </Fragment>
        ))
      )}
    </WorkIndex>
  );
}
