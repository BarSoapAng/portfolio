export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  published: boolean;
  tags: string[];
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "long" }).format(new Date(date));
}
