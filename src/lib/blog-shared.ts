import { formatLongDate } from "./format-date";

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
  thumbnailAlt: string;
  published: boolean;
  tags: string[];
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export function formatPostDate(date: string): string {
  return formatLongDate(date);
}
