import { formatLongDate } from "./format-date";

export type WorkFrontmatter = {
  title: string;
  company: string;
  period: string;
  order: number;
  date: string;
  summary: string;
  published: boolean;
  tags: string[];
};

export type WorkSummary = WorkFrontmatter & {
  slug: string;
};

export function formatWorkDate(date: string): string {
  return formatLongDate(date);
}
