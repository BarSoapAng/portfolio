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
            top: "0",
            right: "-12%",
            width: "38px",
            rotate: "10deg",
          },
          mobile: {
            hidden: true,
            top: "0",
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
            bottom: "20%",
            transform: "scaleX(-1)",
            width: "27px",
          },
          mobile: {
            right: "-11%",
            bottom: "40%",
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
          tablet: { top: "-24%", right: "32.5%", width: "30px" },
          mobile: { top: "-27%", right: "30%", width: "30px" },
        }}
      />
    </WorkExperience>
  );
}
