export type ProjectFrontmatter = {
  title: string;
  date: string;
  summary: string;
  published: boolean;
  tags: string[];
};

export type ProjectSummary = ProjectFrontmatter & {
  slug: string;
};

export function formatProjectDate(date: string): string {
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "long" }).format(new Date(date));
}
