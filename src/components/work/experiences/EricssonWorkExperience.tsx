import ericssonLogo from "@assets/work/ericsson-logo.png";
import phone from "@assets/work/ericsson-phone.png";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function EricssonWorkExperience() {
  return (
    <WorkExperience
      company="Ericsson"
      period="Jan 2025 - Apr 2025"
      title="Software Engineer"
    >
      <WorkArtwork
        src={ericssonLogo}
        alt=""
        aria-hidden="true"
        style={{ right: "28%", top: "-15%", width: "9%" }}
      />
      <WorkArtwork
        src={phone}
        alt=""
        aria-hidden="true"
        style={{ bottom: "-10%", right: "2%", width: "24%" }}
      />
    </WorkExperience>
  );
}
