import "server-only";

import type { StaticImageData } from "next/image";
import hackTheNorth2026 from "@assets/content/HackTheNorth2026.png";
import buildingAScrapbookSite from "@assets/content/building-a-scrapbook-site.webp";
import communityTechMentor from "@assets/content/community-tech-mentor.webp";
import creatorCampaignTracker from "@assets/content/creator-campaign-tracker.webp";
import creatorGrowthConsultant from "@assets/content/creator-growth-consultant.webp";
import frontendEngineerScrapbookStudio from "@assets/content/frontend-engineer-scrapbook-studio.webp";
import macroKitchenJournal from "@assets/content/macro-kitchen-journal.webp";
import oro from "@assets/content/oro.webp";
import oroPivot from "@assets/content/oro-pivot.webp";
import oroPivot1 from "@assets/content/oro-pivot1.png";
import retroUniverseSite from "@assets/content/retro-universe-site.webp";
import weeknotes001 from "@assets/content/weeknotes-001.webp";
import whoAmI from "@assets/content/who-am-i.webp";

const CONTENT_IMAGES = {
  "HackTheNorth2026.png": hackTheNorth2026,
  "building-a-scrapbook-site.webp": buildingAScrapbookSite,
  "community-tech-mentor.webp": communityTechMentor,
  "creator-campaign-tracker.webp": creatorCampaignTracker,
  "creator-growth-consultant.webp": creatorGrowthConsultant,
  "frontend-engineer-scrapbook-studio.webp": frontendEngineerScrapbookStudio,
  "macro-kitchen-journal.webp": macroKitchenJournal,
  "oro-pivot.webp": oroPivot,
  "oro-pivot1.png": oroPivot1,
  "oro.webp": oro,
  "retro-universe-site.webp": retroUniverseSite,
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
