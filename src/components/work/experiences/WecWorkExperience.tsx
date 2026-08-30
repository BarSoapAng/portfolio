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
        style={{ bottom: "70%", right: "15%", width: "11%" }}
      />
      <WorkArtwork
        src={umbrella}
        alt=""
        aria-hidden="true"
        style={{ right: "-7%", bottom: "35%", width: "20%" }}
      />
    </WorkExperience>
  );
}
