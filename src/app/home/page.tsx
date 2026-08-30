import sectionDivider from "@assets/decorative/poro-section-divider.png";
import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import ProjectExperienceStack from "@components/project/ProjectExperienceStack";
import WorkSection from "@components/work/WorkSection";
import { getAllProjects } from "@lib/project";
import { ProjectsSection, SectionDivider } from "./HomePage.styles";

function HomePage() {
  const projects = getAllProjects();

  return (
    <main>
      <SelfDescriptionCard />
      <SectionDivider
        src={sectionDivider}
        alt=""
        aria-hidden="true"
      />

      <WorkSection />

      <ProjectsSection id="projects">
        <ProjectExperienceStack projects={projects} />
      </ProjectsSection>
    </main>
  );
}

export default HomePage;
