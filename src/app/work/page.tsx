import type { Metadata } from "next";
import WorkIndexPage from "@components/work/WorkIndexPage";
import { getAllWorkEntries } from "@lib/work";

export const metadata: Metadata = {
  title: "Work | Angela's Universe",
  description: "A janky retro timeline of work experiences, built from local MDX files.",
};

export default function WorkPage() {
  return <WorkIndexPage entries={getAllWorkEntries()} />;
}
