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
            right: "40%",
            bottom: "-2%",
            rotate: "12deg",
            width: "12%",
          },
          mobile: {
            right: "34%",
            bottom: "-6%",
            rotate: "12deg",
            width: "16%",
          },
        }}
      />
      <WorkArtwork
        src={cybertruck}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { top: "-45%", left: "15%", width: "32%" },
          tablet: { top: "-36%", left: "12%", width: "35%" },
          mobile: { top: "-32%", left: "4%", width: "44%" },
        }}
      />
    </WorkExperience>
  );
}
