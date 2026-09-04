import { Fragment, type ReactNode } from "react";
import {
  WorkIndex,
} from "./WorkExperienceStack.styles";

type WorkExperienceStackProps = {
  experiences: ReactNode[];
  renderConnector?: (index: number) => ReactNode;
};

export default function WorkExperienceStack({
  experiences,
  renderConnector,
}: WorkExperienceStackProps) {
  return (
    <WorkIndex>
      {experiences.map((experience, index) => (
        <Fragment key={index}>
          {experience}
          {index < experiences.length - 1 ? renderConnector?.(index) : null}
        </Fragment>
      ))}
    </WorkIndex>
  );
}
