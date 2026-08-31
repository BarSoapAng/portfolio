import sectionDivider from "@assets/decorative/poro-section-divider.webp";
import BlogPreviewStrip from "@components/blog/BlogPreviewStrip";
import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import ProjectExperienceStack from "@components/project/ProjectExperienceStack";
import WorkSection from "@components/work/WorkSection";
import { getTopPosts } from "@lib/blog";
import { getAllProjects } from "@lib/project";
import { ProjectsSection, SectionDivider } from "./HomePage.styles";

function HomePage() {
  const projects = getAllProjects();
  const recentPosts = getTopPosts(3);

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

      <BlogPreviewStrip posts={recentPosts} />
    </main>
  );
}

export default HomePage;
