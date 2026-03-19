export type WorkFrontmatter = {
  title: string;
  company: string;
  period: string;
  location: string;
  date: string;
  summary: string;
  published: boolean;
  tags: string[];
};

export type WorkSummary = WorkFrontmatter & {
  slug: string;
};

export function formatWorkDate(date: string): string {
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "long" }).format(new Date(date));
}
