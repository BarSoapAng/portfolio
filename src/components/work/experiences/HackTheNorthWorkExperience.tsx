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
        style={{ top: "-20%", right: "-12%", width: "10%", rotate: "10deg" }}
      />
      <WorkArtwork
        src={flower}
        alt=""
        aria-hidden="true"
        style={{
          right: "37%",
          bottom: "16%",
          transform: "scaleX(-1)",
          width: "7%",
        }}
      />
      <WorkArtwork
        src={logo}
        alt=""
        aria-hidden="true"
        style={{ top: "-26%", right: "34.5%", width: "8%" }}
      />
    </WorkExperience>
  );
}
