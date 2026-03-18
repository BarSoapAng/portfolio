import type { Metadata } from "next";
import ProjectIndexPage from "@components/proj/ProjectIndexPage";
import { getAllProjects } from "@lib/project";

export const metadata: Metadata = {
  title: "Projects | Angela's Universe",
  description: "A retro index of projects loaded from local MDX files.",
};

export default function ProjPage() {
  return <ProjectIndexPage projects={getAllProjects()} />;
}
