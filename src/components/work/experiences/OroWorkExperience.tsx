import oroLogo from "@assets/work/oro-logo.webp";
import oroStyled from "@assets/work/oro-styled.webp";
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
        layout={{
          desktop: {
            left: "-6%",
            top: "-29%",
            width: "12%",
            rotate: "-12deg",
          },
          tablet: {
            left: "-6%",
            top: "-29%",
            width: "12%",
            rotate: "-12deg",
          },
          mobile: {
            left: "-6%",
            top: "-25%",
            width: "10%",
            rotate: "-12deg",
          },
        }}
      />
      <WorkArtwork
        src={oroStyled}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { bottom: "50%", left: "13%", width: "20%" },
          tablet: { bottom: "50%", left: "13%", width: "20%" },
          mobile: { bottom: "50%", left: "13%", width: "20%" },
        }}
      />
    </WorkExperience>
  );
}
