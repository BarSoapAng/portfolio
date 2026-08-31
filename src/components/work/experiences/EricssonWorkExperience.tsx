import ericssonLogo from "@assets/work/ericsson-logo.webp";
import phone from "@assets/work/ericsson-phone.webp";
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
        style={{ left: "-8%", top: "3%", width: "6.4%", rotate: "-2deg" }}
      />
      <WorkArtwork
        src={phone}
        alt=""
        aria-hidden="true"
        style={{ bottom: "43%", left: "23%", width: "23%" }}
      />
    </WorkExperience>
  );
}
