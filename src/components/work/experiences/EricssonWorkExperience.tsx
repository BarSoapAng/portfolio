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
            left: "-8%",
            top: "3%",
            width: "6.4%",
            rotate: "-2deg",
          },
          mobile: {
            left: "-8%",
            top: "3%",
            width: "6.4%",
            rotate: "-2deg",
          },
          smallMobile: {
            left: "-7.5%",
            top: "3%",
            width: "5.5%",
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
          tablet: { bottom: "43%", left: "23%", width: "23%" },
          mobile: { bottom: "43%", left: "23%", width: "20%" },
          smallMobile: { bottom: "45%", left: "18%", width: "14.5%" },
        }}
      />
    </WorkExperience>
  );
}
