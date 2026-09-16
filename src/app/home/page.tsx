import sectionDivider from "@assets/decorative/poro-section-divider.webp";
import sectionDividerMobile from "@assets/decorative/poro-section-divider-mobile.webp";
import BlogPreviewStrip from "@components/blog/BlogPreviewStrip";
import DrawingCanvas from "@components/farm/DrawingCanvas";
import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import ProjectExperienceStack from "@components/project/ProjectExperienceStack";
import { Heading2 } from "@components/ui/Typography";
import WorkSection from "@components/work/WorkSection";
import { getTopPosts } from "@lib/blog";
import { mediaQuery } from "@lib/media";
import { getAllProjects } from "@lib/project";
import { getImageProps } from "next/image";
import { FaPaw } from "react-icons/fa";
import {
  GardenSection,
  HomeMain,
  ProjectsSection,
  SectionDivider,
  SectionDividerImage,
} from "./HomePage.styles";

function PoroSectionDivider() {
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    src: sectionDividerMobile,
    alt: "",
    sizes: "100vw",
  });
  const { props: desktop } = getImageProps({
    src: sectionDivider,
    alt: "",
    sizes: "100vw",
  });

  return (
    <SectionDivider>
      <picture>
        <source
          media={mediaQuery.tablet}
          srcSet={mobileSrcSet}
          sizes="100vw"
        />
        <SectionDividerImage {...desktop} aria-hidden="true" />
      </picture>
    </SectionDivider>
  );
}

function HomePage() {
  const projects = getAllProjects();
  const recentPosts = getTopPosts(3);

  return (
    <HomeMain>
      <SelfDescriptionCard />
      <PoroSectionDivider />

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

      <PoroSectionDivider />

      <BlogPreviewStrip posts={recentPosts} />
    </HomeMain>
  );
}

export default HomePage;
