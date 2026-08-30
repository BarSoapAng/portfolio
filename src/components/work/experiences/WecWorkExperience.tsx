import shell from "@assets/work/wec-shell.png";
import umbrella from "@assets/work/wec-umbrella.png";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function WecWorkExperience() {
  return (
    <WorkExperience
      company="WEC"
      period="Jan 2025 - Apr 2025"
      title="Software Engineer"
    >
      <WorkArtwork
        src={shell}
        alt=""
        aria-hidden="true"
        style={{ bottom: "-10%", left: "25%", width: "12%" }}
      />
      <WorkArtwork
        src={umbrella}
        alt=""
        aria-hidden="true"
        style={{ left: "2%", top: "-15%", width: "18%" }}
      />
    </WorkExperience>
  );
}
