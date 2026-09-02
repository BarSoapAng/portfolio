import flag from "@assets/work/htn-flag.webp";
import flower from "@assets/work/htn-flower.webp";
import logo from "@assets/work/htn-logo.webp";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function HackTheNorthWorkExperience() {
  return (
    <WorkExperience
      company="Hack the North"
      period="Mar 2026 - Present"
      title="Frontend Developer"
    >
      <WorkArtwork
        src={flag}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: {
            top: "-20%",
            right: "-12%",
            width: "10%",
            rotate: "10deg",
          },
          tablet: {
            top: "-16%",
            right: "-4%",
            width: "12%",
            rotate: "10deg",
          },
          mobile: {
            top: "-12%",
            right: "0",
            width: "16%",
            rotate: "10deg",
          },
        }}
      />
      <WorkArtwork
        src={flower}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: {
            right: "37%",
            bottom: "16%",
            transform: "scaleX(-1)",
            width: "7%",
          },
          tablet: {
            right: "35%",
            bottom: "12%",
            transform: "scaleX(-1)",
            width: "9%",
          },
          mobile: {
            right: "29%",
            bottom: "6%",
            transform: "scaleX(-1)",
            width: "12%",
          },
        }}
      />
      <WorkArtwork
        src={logo}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { top: "-26%", right: "34.5%", width: "8%" },
          tablet: { top: "-22%", right: "32%", width: "10%" },
          mobile: { top: "-16%", right: "27%", width: "13%" },
        }}
      />
    </WorkExperience>
  );
}
