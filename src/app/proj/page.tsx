import type { Metadata } from "next";
import Link from "next/link";
import TagLabel from "@components/ui/TagLabel";
import { getAllProjects } from "@lib/project";
import { formatProjectDate } from "@lib/project-shared";

export const metadata: Metadata = {
  title: "Projects | Angela's Universe",
  description: "A retro index of projects loaded from local MDX files.",
};

const PROJECT_MARQUEE_TEXT =
  "SUPER COOL PROJECTS ✦ 10% OFF ENTIRE STORE ✦ LOL IDK WHAT TO PUT HERE BUT I REALLY WANTED TO INCORPORATE THIS EFFECT ✦ ARE YOU HAVING FUN? ✦ I'D LOVE TO CHAT WITH YOU! ✦";

function EmptyState() {
  return (
    <article>
      <h2>No projects yet</h2>
      <p>
        Add <code>.mdx</code> files inside <code>content/project</code> with frontmatter
        fields: <code>title</code>, <code>order</code>, <code>date</code>,{" "}
        <code>summary</code>, <code>published</code>, and <code>tags</code>.
      </p>
    </article>
  );
}

export default function ProjPage() {
  const projects = getAllProjects();

  return (
    <main>
      <header>
        <p>Project Index 2003.exe</p>
        <h1>
          Proj Lab <span aria-hidden>[retro icons]</span>
        </h1>
        <p>
          This page auto-builds from local MDX files in <code>content/project</code>.
          Each card opens a full project page with its own long-form writeup.
        </p>
      </header>

      <p>{PROJECT_MARQUEE_TEXT}</p>

      <section>
        {projects.length === 0 ? <EmptyState /> : null}

        {projects.map((project) => (
          <article key={project.slug}>
            <p>
              <span>{formatProjectDate(project.date)}</span>{" "}
              {project.tags.map((tag) => (
                <TagLabel key={tag} label={tag} />
              ))}
            </p>
            <h2>
              <Link href={`/proj/${project.slug}`}>{project.title}</Link>
            </h2>
            <p>{project.summary}</p>
            <p>
              <Link href={`/proj/${project.slug}`}>Open project page →</Link>
            </p>
          </article>
        ))}
      </section>

      <aside>
        <h2>Directory Feed</h2>
        <p>
          Projects online: <strong>{projects.length}</strong>
        </p>
        <p>Format: local MDX logs + custom descriptions</p>
        <p>Vibe: loud colors, gifs, and tiny chaos</p>
      </aside>
    </main>
  );
}
