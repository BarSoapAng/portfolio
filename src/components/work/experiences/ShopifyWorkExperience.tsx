import shopifyLogo from "@assets/work/shopify-logo.png";
import shoppy from "@assets/work/shopify-shoppy.png";
import WorkExperience from "../WorkExperience";
import { WorkArtwork } from "../WorkExperienceStack.styles";

export default function ShopifyWorkExperience() {
  return (
    <WorkExperience
      company="Shopify"
      period="Sep 2025 - Dec 2025"
      title="Software Engineer"
    >
      <WorkArtwork
        src={shopifyLogo}
        alt=""
        aria-hidden="true"
        style={{ bottom: "-20%", left: "2%", width: "15%" }}
      />
      <WorkArtwork
        src={shoppy}
        alt=""
        aria-hidden="true"
        style={{ left: "22%", top: "-10%", width: "17%" }}
      />
    </WorkExperience>
  );
}
