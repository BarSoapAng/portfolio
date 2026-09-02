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
        layout={{
          desktop: { bottom: "20%", right: "38%", width: "10%" },
          tablet: { bottom: "15%", right: "36%", width: "12%" },
          mobile: { bottom: "8%", right: "32%", width: "15%" },
        }}
      />
      <WorkArtwork
        src={shoppy}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { right: "-5%", top: "-70%", width: "22%" },
          tablet: { right: "0", top: "-55%", width: "25%" },
          mobile: { right: "2%", top: "-44%", width: "30%" },
        }}
      />
    </WorkExperience>
  );
}
