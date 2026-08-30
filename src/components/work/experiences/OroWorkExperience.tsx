import oroLogo from "@assets/work/oro-logo.png";
import oroStyled from "@assets/work/oro-styled.png";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function OroWorkExperience() {
  return (
    <WorkExperience
      company="Oro"
      period="Feb 2026 - Present"
      title="Chief Product Officer"
    >
      <WorkArtwork
        src={oroLogo}
        alt=""
        aria-hidden="true"
        style={{ right: "2%", top: "-5%", width: "31%" }}
      />
      <WorkArtwork
        src={oroStyled}
        alt=""
        aria-hidden="true"
        style={{ bottom: "-10%", right: "34%", width: "25%" }}
      />
    </WorkExperience>
  );
}
