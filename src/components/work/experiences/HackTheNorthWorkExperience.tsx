import flag from "@assets/work/htn-flag.png";
import flower from "@assets/work/htn-flower.png";
import logo from "@assets/work/htn-logo.png";
import wordmark from "@assets/work/htn-wordmark.png";
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
        style={{ top: "-20%", right: "-9%", width: "10%", rotate: "9deg" }}
      />
      <WorkArtwork
        src={flower}
        alt=""
        aria-hidden="true"
        style={{
          right: "39%",
          top: "-10%",
          transform: "scaleX(-1)",
          width: "10%",
        }}
      />
      <WorkArtwork
        src={logo}
        alt=""
        aria-hidden="true"
        style={{ bottom: "-10%", left: "14%", width: "15%" }}
      />
      <WorkArtwork
        src={wordmark}
        alt=""
        aria-hidden="true"
        style={{ left: "3%", rotate: "4deg", top: "0", width: "34%" }}
      />
    </WorkExperience>
  );
}
