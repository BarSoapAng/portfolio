import type { StaticImageData } from "next/image";

export type ProjectFrontmatter = {
  title: string;
  order: number;
  date: string;
  summary: string;
  thumbnail: StaticImageData;
  thumbnailAlt: string;
  published: boolean;
  tags: string[];
};

export type ProjectSummary = ProjectFrontmatter & {
  slug: string;
};
