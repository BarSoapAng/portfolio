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
            top: "0",
            right: "-12%",
            width: "38px",
            rotate: "10deg",
          },
          tablet: {
            hidden: true,
            top: "-14%",
            right: "-12%",
            width: "38px",
            rotate: "10deg",
          },
          mobile: {
            hidden: true,
            top: "-43%",
            right: "5%",
            width: "38px",
            rotate: "10deg",
          },
          smallMobile: {
            hidden: true,
            top: "-43%",
            right: "5%",
            width: "38px",
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
            bottom: "20%",
            transform: "scaleX(-1)",
            width: "27px",
          },
          tablet: {
            right: "37%",
            bottom: "12%",
            transform: "scaleX(-1)",
            width: "27px",
          },
          mobile: {
            right: "-10%",
            bottom: "14%",
            width: "35px",
          },
          smallMobile: {
            right: "-6%",
            bottom: "32%",
            width: "35px",
          },
        }}
      />
      <WorkArtwork
        src={logo}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { top: "-19%", right: "34.5%", width: "30px" },
          tablet: { top: "-19%", right: "34.5%", width: "30px" },
          mobile: { top: "-42%", right: "30.5%", width: "35px" },
          smallMobile: { top: "-40%", right: "29%", width: "29px" },
        }}
      />
    </WorkExperience>
  );
}
