import shell from "@assets/work/wec-shell.webp";
import umbrella from "@assets/work/wec-umbrella.webp";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function WecWorkExperience() {
  return (
    <WorkExperience
      company="WEC"
      period="Jan 2025 - Apr 2025"
      title="Software Engineer"
    >
      <WorkArtwork
        src={shell}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { bottom: "70%", right: "11%", width: "11%" },
          tablet: { bottom: "70%", right: "11%", width: "11%" },
          mobile: { bottom: "70%", right: "11%", width: "11%" },
          smallMobile: {
            bottom: "75%",
            right: "1%",
            width: "9.5%",
            transform: "scaleX(-1)",
          },
        }}
      />
      <WorkArtwork
        src={umbrella}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { right: "-10%", bottom: "35%", width: "20%" },
          tablet: { right: "-10%", bottom: "35%", width: "20%" },
          mobile: { right: "-10%", bottom: "35%", width: "20%" },
          smallMobile: {
            right: "11%",
            bottom: "55%",
            width: "21%",
            transform: "scaleX(-1)",
            rotate: "10deg",
          },
        }}
      />
    </WorkExperience>
  );
}
