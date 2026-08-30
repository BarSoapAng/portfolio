import { useId, type ReactNode } from "react";
import {
  Company,
  CompanyName,
  JobTitle,
  Period,
  WorkArtworkArea,
  WorkCopy,
  WorkEntry,
  WorkHeading,
} from "./WorkExperienceStack.styles";

type WorkExperienceProps = {
  children: ReactNode;
  company: string;
  period: string;
  title: string;
};

export default function WorkExperience({
  children,
  company,
  period,
  title,
}: WorkExperienceProps) {
  const titleId = useId();

  return (
    <WorkEntry>
      <WorkCopy>
        <WorkHeading>
          <CompanyName>
            <Company
              aria-describedby={titleId}
              data-cursor="pointer"
              type="button"
            >
              {company}
            </Company>
          </CompanyName>
          <JobTitle id={titleId} role="tooltip">
            {title}
          </JobTitle>
        </WorkHeading>
        <Period>{period}</Period>
      </WorkCopy>
      <WorkArtworkArea>{children}</WorkArtworkArea>
    </WorkEntry>
  );
}
