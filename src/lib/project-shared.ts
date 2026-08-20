import { formatLongDate } from "./format-date";

export type ProjectFrontmatter = {
  title: string;
  order: number;
  date: string;
  summary: string;
  thumbnail: string;
  thumbnailAlt: string;
  published: boolean;
  tags: string[];
};

export type ProjectSummary = ProjectFrontmatter & {
  slug: string;
};

export function formatProjectDate(date: string): string {
  return formatLongDate(date);
}
