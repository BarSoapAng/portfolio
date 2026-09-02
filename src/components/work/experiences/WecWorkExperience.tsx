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
          tablet: { bottom: "64%", right: "12%", width: "13%" },
          mobile: { bottom: "54%", right: "18%", width: "17%" },
        }}
      />
      <WorkArtwork
        src={umbrella}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { right: "-10%", bottom: "35%", width: "20%" },
          tablet: { right: "-3%", bottom: "30%", width: "23%" },
          mobile: { right: "1%", bottom: "20%", width: "30%" },
        }}
      />
    </WorkExperience>
  );
}
