import sectionDivider from "@assets/decorative/poro-section-divider.png";
import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import VinylPlayer from "@components/home/VinylPlayer";
import ProjectExperienceStack from "@components/project/ProjectExperienceStack";
import WorkExperienceStack from "@components/work/WorkExperienceStack";
import { getAllProjects } from "@lib/project";
import { getAllWorkEntries } from "@lib/work";
import { IndexSection, SectionDivider } from "./HomePage.styles";

function HomePage() {
  const projects = getAllProjects();
  const workEntries = getAllWorkEntries();

  return (
    <main>
      <SelfDescriptionCard />
      <VinylPlayer />
      <SectionDivider
        src={sectionDivider}
        alt=""
        aria-hidden="true"
      />

      <IndexSection id="work">
        <h2>Work</h2>
        <WorkExperienceStack entries={workEntries} />
      </IndexSection>
      <SectionDivider
        src={sectionDivider}
        alt=""
        aria-hidden="true"
      />

      <IndexSection id="projects">
        <h2>Projects</h2>
        <ProjectExperienceStack projects={projects} />
      </IndexSection>
    </main>
  );
}

export default HomePage;
