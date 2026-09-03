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
            right: "43%",
            bottom: "-2.5%",
            rotate: "12deg",
            width: "38px",
          },
          mobile: {
            right: "47%",
            bottom: "0",
            rotate: "12deg",
            width: "36px",
          },
          smallMobile: {
            right: "51%",
            bottom: "13%",
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
          tablet: { top: "-32%", left: "15%", width: "123px" },
          mobile: { top: "-27%", left: "15%", width: "107px" },
          smallMobile: { top: "-41%", left: "13%", width: "107px" },
        }}
      />
    </WorkExperience>
  );
}
