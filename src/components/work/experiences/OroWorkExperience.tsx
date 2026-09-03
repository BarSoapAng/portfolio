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
            top: "-21%",
            width: "46px",
            rotate: "-12deg",
          },
          tablet: {
            left: "-6%",
            top: "-21%",
            width: "46px",
            rotate: "-12deg",
          },
          mobile: {
            left: "-6%",
            top: "-21%",
            width: "38px",
            rotate: "-12deg",
          },
          smallMobile: {
            left: "-6%",
            top: "-21%",
            width: "35px",
            rotate: "-25deg",
          },
        }}
      />
      <WorkArtwork
        src={oroStyled}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { bottom: "65%", left: "13%", width: "77px" },
          tablet: { bottom: "65%", left: "13%", width: "77px" },
          mobile: { bottom: "65%", left: "13%", width: "77px" },
          smallMobile: { bottom: "65%", left: "10%", width: "69px" },
        }}
      />
    </WorkExperience>
  );
}
