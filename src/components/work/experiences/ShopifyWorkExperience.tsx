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
          desktop: { bottom: "20%", right: "38%", width: "38px" },
          tablet: { bottom: "20%", right: "38%", width: "38px" },
          mobile: { bottom: "24%", right: "37.5%", width: "35px" },
          smallMobile: { bottom: "24%", right: "37.5%", width: "32px" },
        }}
      />
      <WorkArtwork
        src={shoppy}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { right: "-5%", top: "-70%", width: "85px" },
          tablet: { right: "-5%", top: "-70%", width: "85px" },
          mobile: { right: "-6.5%", top: "-80%", width: "88px" },
          smallMobile: { right: "-1%", top: "-85%", width: "77px" },
        }}
      />
    </WorkExperience>
  );
}
