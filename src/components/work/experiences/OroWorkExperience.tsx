import oroLogo from "@assets/work/oro-logo.png";
import oroStyled from "@assets/work/oro-styled.png";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function OroWorkExperience() {
  return (
    <WorkExperience
      company="Oro"
      period="Feb 2026 - Present"
      title="Chief Operating Officer"
    >
      <WorkArtwork
        src={oroLogo}
        alt=""
        aria-hidden="true"
        style={{ left: "-6%", top: "-29%", width: "12%", rotate: "-12deg" }}
      />
      <WorkArtwork
        src={oroStyled}
        alt=""
        aria-hidden="true"
        style={{ bottom: "50%", left: "13%", width: "20%" }}
      />
    </WorkExperience>
  );
}
