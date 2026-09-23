import "server-only";

import type { StaticImageData } from "next/image";
import dabDetector9000 from "@assets/projects/dab-detector-9000.webp";
import internetNudity from "@assets/content/internet-nudity/internet-nudity.webp";
import oroPivot from "@assets/content/oro-pivot/oro-pivot.webp";
import rakansFeather from "@assets/projects/rakans-feather.webp";
import whoAmI from "@assets/content/who-am-i/who-am-i.webp";
import dotfiles from "@assets/projects/dotfiles.webp";
import leaguePurityTest from "@assets/projects/league-purity-test.webp";
import leetcodeDiscordBot from "@assets/projects/leetcode-discord-bot.webp";
import ludus from "@assets/projects/ludus.webp";
import nodeReactTemplate from "@assets/projects/node-react-template.webp";

const CONTENT_IMAGES = {
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
