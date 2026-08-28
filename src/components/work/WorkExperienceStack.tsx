import { Fragment, type ReactNode } from "react";
import { ContentCardBody } from "@components/ui/ContentStyles";
import { type WorkSummary } from "@lib/work-shared";
import {
  WorkEntry,
  WorkHeading,
  WorkDetails,
  Company,
  Period,
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
                </WorkHeading>
                <WorkDetails>
                  <Company>{entry.company}</Company>
                  <Period>{entry.period}</Period>
                </WorkDetails>
              </ContentCardBody>
            </WorkEntry>
            {index < entries.length - 1 ? renderConnector?.(index) : null}
          </Fragment>
        ))
      )}
    </WorkIndex>
  );
}
