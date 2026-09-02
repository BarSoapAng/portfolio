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
            hidden: true,
            top: "-20%",
            right: "-12%",
            width: "10%",
            rotate: "10deg",
          },
          mobile: {
            hidden: true,
            top: "-60%",
            right: "5%",
            width: "10%",
            rotate: "10deg",
          },
          smallMobile: {
            hidden: true,
            top: "-60%",
            right: "5%",
            width: "10%",
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
            right: "37%",
            bottom: "16%",
            transform: "scaleX(-1)",
            width: "7%",
          },
          mobile: {
            right: "-10%",
            bottom: "20%",
            width: "9%",
          },
          smallMobile: {
            right: "-6%",
            bottom: "44%",
            width: "9%",
          },
        }}
      />
      <WorkArtwork
        src={logo}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { top: "-26%", right: "34.5%", width: "8%" },
          tablet: { top: "-26%", right: "34.5%", width: "8%" },
          mobile: { top: "-58%", right: "30.5%", width: "9%" },
          smallMobile: { top: "-55%", right: "29%", width: "7.5%" },
        }}
      />
    </WorkExperience>
  );
}
