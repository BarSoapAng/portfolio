"use client";

import sectionDivider from "@assets/decorative/poro-section-divider.webp";
import sectionDividerMobile from "@assets/decorative/poro-section-divider-mobile.webp";
import { mediaQuery } from "@lib/media";
import { useSyncExternalStore } from "react";
import { SectionDivider, SectionDividerImage } from "./HomePage.styles";

function subscribeToLargeMobile(onChange: () => void) {
  const query = window.matchMedia(mediaQuery.largeMobile);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getLargeMobileSnapshot() {
  return window.matchMedia(mediaQuery.largeMobile).matches;
}

function getLargeMobileServerSnapshot() {
  return false;
}

export default function PoroSectionDivider() {
  const isLargeMobile = useSyncExternalStore(
    subscribeToLargeMobile,
    getLargeMobileSnapshot,
    getLargeMobileServerSnapshot,
  );

  return (
    <SectionDivider>
      <SectionDividerImage
        src={isLargeMobile ? sectionDividerMobile : sectionDivider}
        alt=""
        aria-hidden="true"
      />
    </SectionDivider>
  );
}
