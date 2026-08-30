import cybertruck from "@assets/work/cybertruck.png";
import teslaLogo from "@assets/work/tesla-logo.png";
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
        style={{ right: "35%", rotate: "-12deg", top: "-5%", width: "13%" }}
      />
      <WorkArtwork
        src={cybertruck}
        alt=""
        aria-hidden="true"
        style={{ bottom: "-15%", right: "0", width: "32%" }}
      />
    </WorkExperience>
  );
}
