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
          tablet: { bottom: "20%", right: "38%", width: "10%" },
          mobile: { bottom: "24%", right: "37.5%", width: "9%" },
          smallMobile: { bottom: "24%", right: "37.5%", width: "8.5%" },
        }}
      />
      <WorkArtwork
        src={shoppy}
        alt=""
        aria-hidden="true"
        layout={{
          desktop: { right: "-5%", top: "-70%", width: "22%" },
          tablet: { right: "-5%", top: "-70%", width: "22%" },
          mobile: { right: "-6.5%", top: "-80%", width: "23%" },
          smallMobile: { right: "-1%", top: "-85%", width: "20%" },
        }}
      />
    </WorkExperience>
  );
}
