import cybertruck from "@assets/work/cybertruck.webp";
import teslaLogo from "@assets/work/tesla-logo.webp";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function TeslaWorkExperience() {
  return (
    <WorkExperience
      company="Tesla"
      period="Jul 2026 - Present"
      title="Software Engineer"
    >
      <WorkArtwork
        src={teslaLogo}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: {
            right: "43%",
            bottom: "-3.5%",
            rotate: "12deg",
            width: "10%",
          },
          tablet: {
            right: "43%",
            bottom: "-3.5%",
            rotate: "12deg",
            width: "10%",
          },
          mobile: {
            right: "47%",
            bottom: "0",
            rotate: "12deg",
            width: "9.5%",
          },
          smallMobile: {
            right: "51%",
            bottom: "18%",
            rotate: "11deg",
            width: "8%",
          },
        }}
      />
      <WorkArtwork
        src={cybertruck}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { top: "-45%", left: "15%", width: "32%" },
          tablet: { top: "-45%", left: "15%", width: "32%" },
          mobile: { top: "-38%", left: "15%", width: "28%" },
          smallMobile: { top: "-57%", left: "13%", width: "28%" },
        }}
      />
    </WorkExperience>
  );
}
