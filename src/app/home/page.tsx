import sectionDivider from "@assets/decorative/poro-section-divider.webp";
import BlogPreviewStrip from "@components/blog/BlogPreviewStrip";
import DrawingCanvas from "@components/farm/DrawingCanvas";
import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import ProjectExperienceStack from "@components/project/ProjectExperienceStack";
import { Heading2 } from "@components/ui/Typography";
import WorkSection from "@components/work/WorkSection";
import { getTopPosts } from "@lib/blog";
import { getAllProjects } from "@lib/project";
import { FaPaw } from "react-icons/fa";
import {
  GardenSection,
  HomeMain,
  ProjectsSection,
  SectionDivider,
} from "./HomePage.styles";

function HomePage() {
  const projects = getAllProjects();
  const recentPosts = getTopPosts(3);

  return (
    <HomeMain>
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

      <GardenSection>
        <Heading2>
          Leave a Mark
          <FaPaw aria-hidden />
        </Heading2>
        <DrawingCanvas />
      </GardenSection>

      <SectionDivider
        src={sectionDivider}
        alt=""
        aria-hidden="true"
      />

      <BlogPreviewStrip posts={recentPosts} />
    </HomeMain>
  );
}

export default HomePage;
