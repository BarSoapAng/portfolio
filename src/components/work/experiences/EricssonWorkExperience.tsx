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
        layout={{
          desktop: {
            left: "-8%",
            top: "3%",
            width: "6.4%",
            rotate: "-2deg",
          },
          tablet: {
            left: "-4%",
            top: "3%",
            width: "8%",
            rotate: "-2deg",
          },
          mobile: {
            left: "0",
            top: "5%",
            width: "11%",
            rotate: "-2deg",
          },
        }}
      />
      <WorkArtwork
        src={phone}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { bottom: "43%", left: "23%", width: "23%" },
          tablet: { bottom: "38%", left: "24%", width: "26%" },
          mobile: { bottom: "30%", left: "25%", width: "32%" },
        }}
      />
    </WorkExperience>
  );
}
