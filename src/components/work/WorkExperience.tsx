import { type ReactNode } from "react";
import {
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
  return (
    <WorkEntry>
      <WorkCopy>
        <WorkHeading>
          <CompanyName>{company}</CompanyName>
          <JobTitle>{title}</JobTitle>
        </WorkHeading>
        <Period>{period}</Period>
      </WorkCopy>
      <WorkArtworkArea>{children}</WorkArtworkArea>
    </WorkEntry>
  );
}
