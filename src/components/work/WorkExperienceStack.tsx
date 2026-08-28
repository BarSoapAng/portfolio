import { Fragment, type ReactNode } from "react";
import { type WorkSummary } from "@lib/work-shared";
import {
  WorkEntry,
  WorkHeading,
  Company,
  CompanyName,
  JobTitle,
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
              <WorkHeading>
                <CompanyName>
                  <Company aria-describedby={`work-title-${index}`} type="button">
                    {entry.company}
                  </Company>
                </CompanyName>
                <JobTitle id={`work-title-${index}`} role="tooltip">
                  {entry.title}
                </JobTitle>
              </WorkHeading>
              <Period>{entry.period}</Period>
            </WorkEntry>
            {index < entries.length - 1 ? renderConnector?.(index) : null}
          </Fragment>
        ))
      )}
    </WorkIndex>
  );
}
