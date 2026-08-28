import sectionDivider from "@assets/decorative/poro-section-divider.png";
import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import ProjectExperienceStack from "@components/project/ProjectExperienceStack";
import WorkSection from "@components/work/WorkSection";
import { getAllProjects } from "@lib/project";
import { getAllWorkEntries } from "@lib/work";
import { IndexSection, SectionDivider } from "./HomePage.styles";

function HomePage() {
  const projects = getAllProjects();
  const workEntries = getAllWorkEntries();

  return (
    <main>
      <SelfDescriptionCard />
      <SectionDivider
        src={sectionDivider}
        alt=""
        aria-hidden="true"
      />

      <WorkSection entries={workEntries} />
      <SectionDivider
        src={sectionDivider}
        alt=""
        aria-hidden="true"
      />

      <IndexSection id="projects">
        <ProjectExperienceStack projects={projects} />
      </IndexSection>
    </main>
  );
}

export default HomePage;
