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
            top: "2%",
            width: "24px",
            rotate: "-2deg",
          },
          tablet: {
            left: "-8%",
            top: "2%",
            width: "24px",
            rotate: "-2deg",
          },
          mobile: {
            left: "-8%",
            top: "2%",
            width: "24px",
            rotate: "-2deg",
          },
          smallMobile: {
            left: "-7.5%",
            top: "2%",
            width: "21px",
            rotate: "-2deg",
          },
        }}
      />
      <WorkArtwork
        src={phone}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { bottom: "60%", left: "23%", width: "88px" },
          tablet: { bottom: "60%", left: "23%", width: "88px" },
          mobile: { bottom: "60%", left: "23%", width: "77px" },
          smallMobile: { bottom: "60%", left: "18%", width: "56px" },
        }}
      />
    </WorkExperience>
  );
}
