"use client";

import { Fragment, type MouseEvent, type ReactNode } from "react";
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

function getJobTitle(event: MouseEvent<HTMLButtonElement>) {
  return event.currentTarget.parentElement?.nextElementSibling;
}

function positionJobTitle(event: MouseEvent<HTMLButtonElement>) {
  const tooltip = getJobTitle(event);

  if (!(tooltip instanceof HTMLElement)) {
    return;
  }

  tooltip.style.setProperty("--tooltip-x", `${event.clientX}px`);
  tooltip.style.setProperty("--tooltip-y", `${event.clientY}px`);
  tooltip.setAttribute("data-cursor-positioned", "true");
}

function resetJobTitlePosition(event: MouseEvent<HTMLButtonElement>) {
  getJobTitle(event)?.removeAttribute("data-cursor-positioned");
}

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
                  <Company
                    aria-describedby={`work-title-${index}`}
                    data-cursor="help"
                    onMouseEnter={positionJobTitle}
                    onMouseLeave={resetJobTitlePosition}
                    onMouseMove={positionJobTitle}
                    type="button"
                  >
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
