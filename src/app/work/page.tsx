import type { Metadata } from "next";
import WorkExperienceStack from "@components/work/WorkExperienceStack";
import { getAllWorkEntries } from "@lib/work";

export const metadata: Metadata = {
  title: "Work | Angela's Universe",
  description: "A janky retro timeline of work experiences, built from local MDX files.",
};

export default function WorkPage() {
  const entries = getAllWorkEntries();

  return (
    <main>
      <header>
        <p>Check it out</p>
        <h1>Experiences</h1>
        <p>Where I&apos;ve worked and where I&apos;m working now!</p>
      </header>

      <aside>
        <p>click cards for details</p>
        <p>
          {entries.length} {entries.length === 1 ? "role" : "roles"} explored
        </p>
      </aside>

      <WorkExperienceStack entries={entries} />
    </main>
  );
}
