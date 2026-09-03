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
            right: "45%",
            bottom: "20%",
            rotate: "12deg",
            width: "38px",
          },
          tablet: {
            right: "47%",
            bottom: "25%",
            rotate: "12deg",
            width: "32px",
          },
          mobile: {
            right: "47%",
            bottom: "20%",
            rotate: "12deg",
            width: "36px",
          },
          smallMobile: {
            right: "51%",
            bottom: "20%",
            rotate: "11deg",
            width: "30px",
          },
        }}
      />
      <WorkArtwork
        src={cybertruck}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { bottom: "60%", left: "16%", width: "123px" },
          tablet: { bottom: "60%", left: "15%", width: "123px" },
          mobile: { bottom: "60%", left: "15%", width: "107px" },
          smallMobile: { bottom: "60%", left: "13%", width: "107px" },
        }}
      />
    </WorkExperience>
  );
}
