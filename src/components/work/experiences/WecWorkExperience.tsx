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
          desktop: { bottom: "65%", right: "11%", width: "42px" },
          tablet: { bottom: "50%", right: "11%", width: "42px" },
          mobile: { bottom: "50%", right: "11%", width: "42px" },
          smallMobile: {
            bottom: "54%",
            right: "1%",
            width: "37px",
            transform: "scaleX(-1)",
          },
        }}
      />
      <WorkArtwork
        src={umbrella}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { right: "-10%", bottom: "58%", width: "77px" },
          tablet: { right: "-10%", bottom: "25%", width: "77px" },
          mobile: { right: "-10%", bottom: "25%", width: "77px" },
          smallMobile: {
            right: "11%",
            bottom: "40%",
            width: "80px",
            transform: "scaleX(-1)",
            rotate: "10deg",
          },
        }}
      />
    </WorkExperience>
  );
}
