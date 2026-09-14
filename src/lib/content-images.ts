import "server-only";

import type { StaticImageData } from "next/image";
import buildingAScrapbookSite from "@assets/content/building-a-scrapbook-site.webp";
import creatorGrowthConsultant from "@assets/content/creator-growth-consultant.webp";
import dabDetector9000 from "@assets/content/dab-detector-9000.webp";
import internetNudity from "@assets/content/internet-nudity.webp";
import oroPivot from "@assets/content/oro-pivot.webp";
import rakansFeather from "@assets/content/rakans-feather.webp";
import whoAmI from "@assets/content/who-am-i.webp";
import dotfiles from "@assets/content/dotfiles.webp";
import leaguePurityTest from "@assets/content/league-purity-test.webp";
import leetcodeDiscordBot from "@assets/content/leetcode-discord-bot.webp";
import ludus from "@assets/content/ludus.webp";
import nodeReactTemplate from "@assets/content/node-react-template.webp";

const CONTENT_IMAGES = {
  "building-a-scrapbook-site.webp": buildingAScrapbookSite,
  "creator-growth-consultant.webp": creatorGrowthConsultant,
  "dab-detector-9000.webp": dabDetector9000,
  "internet-nudity.webp": internetNudity,
  "oro-pivot.webp": oroPivot,
  "rakans-feather.webp": rakansFeather,
  "who-am-i.webp": whoAmI,
  "dotfiles.webp": dotfiles,
  "league-purity-test.webp": leaguePurityTest,
  "leetcode-discord-bot.webp": leetcodeDiscordBot,
  "ludus.webp": ludus,
  "node-react-template.webp": nodeReactTemplate,
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
