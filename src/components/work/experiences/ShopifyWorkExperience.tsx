import shopifyLogo from "@assets/work/shopify-logo.webp";
import shoppy from "@assets/work/shopify-shoppy.webp";
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
        style={{ bottom: "20%", right: "38%", width: "10%" }}
      />
      <WorkArtwork
        src={shoppy}
        alt=""
        aria-hidden="true"
        style={{ right: "-5%", top: "-70%", width: "22%" }}
      />
    </WorkExperience>
  );
}
