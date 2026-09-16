"use client";

import sectionDivider from "@assets/decorative/poro-section-divider.webp";
import sectionDividerMobile from "@assets/decorative/poro-section-divider-mobile.webp";
import { mediaQuery } from "@lib/media";
import { useSyncExternalStore } from "react";
import { SectionDivider, SectionDividerImage } from "./HomePage.styles";

function subscribeToTablet(onChange: () => void) {
  const query = window.matchMedia(mediaQuery.tablet);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getTabletSnapshot() {
  return window.matchMedia(mediaQuery.tablet).matches;
}

function getTabletServerSnapshot() {
  return false;
}

export default function PoroSectionDivider() {
  const isTablet = useSyncExternalStore(
    subscribeToTablet,
    getTabletSnapshot,
    getTabletServerSnapshot,
  );

  return (
    <SectionDivider>
      <SectionDividerImage
        src={isTablet ? sectionDividerMobile : sectionDivider}
        alt=""
        aria-hidden="true"
      />
    </SectionDivider>
  );
}
