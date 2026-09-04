import type { StaticImageData } from "next/image";
import { formatLongDate } from "./format-date";

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  thumbnail: StaticImageData;
  thumbnailAlt: string;
  pinned: boolean;
  published: boolean;
  similarReads: string[];
  tags: string[];
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export function formatPostDate(date: string): string {
  return formatLongDate(date);
}
