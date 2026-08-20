import type { Metadata } from "next";
import typingNah from "@assets/work/typing_nay.gif";
import typingYay from "@assets/work/typing_yay.gif";
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

      <aside className="work-gif-panel">
        <p>click cards for details</p>
        <img alt="A pixel character typing furiously" src={typingNah.src} />
        <p>
          <img alt="" aria-hidden src={typingYay.src} />
          {entries.length} {entries.length === 1 ? "role" : "roles"} explored
        </p>
      </aside>

      <WorkExperienceStack entries={entries} />
    </main>
  );
}
