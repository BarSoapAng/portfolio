import "server-only";

import type { StaticImageData } from "next/image";
import hackTheNorth2026 from "@assets/content/HackTheNorth2026.png";
import buildingAScrapbookSite from "@assets/content/building-a-scrapbook-site.webp";
import communityTechMentor from "@assets/content/community-tech-mentor.webp";
import creatorGrowthConsultant from "@assets/content/creator-growth-consultant.webp";
import dabDetector9000 from "@assets/content/dab-detector-9000.jpg";
import focusBuddy from "@assets/content/focus-buddy.png";
import frontendEngineerScrapbookStudio from "@assets/content/frontend-engineer-scrapbook-studio.webp";
import hackTheNorthEvents from "@assets/content/hack-the-north-events.png";
import oro from "@assets/content/oro.webp";
import oroPivot from "@assets/content/oro-pivot.webp";
import oroPivot1 from "@assets/content/oro-pivot1.png";
import rakansFeather from "@assets/content/rakans-feather.png";
import retroUniverseSite from "@assets/content/retro-universe-site.webp";
import wec2026 from "@assets/content/wec-2026.png";
import weeknotes001 from "@assets/content/weeknotes-001.webp";
import whoAmI from "@assets/content/who-am-i.webp";

const CONTENT_IMAGES = {
  "HackTheNorth2026.png": hackTheNorth2026,
  "building-a-scrapbook-site.webp": buildingAScrapbookSite,
  "community-tech-mentor.webp": communityTechMentor,
  "creator-growth-consultant.webp": creatorGrowthConsultant,
  "dab-detector-9000.jpg": dabDetector9000,
  "focus-buddy.png": focusBuddy,
  "frontend-engineer-scrapbook-studio.webp": frontendEngineerScrapbookStudio,
  "hack-the-north-events.png": hackTheNorthEvents,
  "oro-pivot.webp": oroPivot,
  "oro-pivot1.png": oroPivot1,
  "oro.webp": oro,
  "rakans-feather.png": rakansFeather,
  "retro-universe-site.webp": retroUniverseSite,
  "wec-2026.png": wec2026,
  "weeknotes-001.webp": weeknotes001,
  "who-am-i.webp": whoAmI,
} satisfies Record<string, StaticImageData>;

export function requireContentImageField(key: string) {
  return (value: unknown, fileName: string): StaticImageData => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(`Expected "${key}" to be a non-empty asset filename in ${fileName}.`);
    }

    const image = CONTENT_IMAGES[value as keyof typeof CONTENT_IMAGES];

    if (!image) {
      throw new Error(`Expected "${key}" to reference a registered content image in ${fileName}.`);
    }

    return image;
  };
}
