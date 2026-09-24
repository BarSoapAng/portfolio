import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import { getTopPosts } from "@lib/blog";
import { projectsEnabled } from "@lib/feature-flags";
import { getAllProjects } from "@lib/project";
import { HomeMain } from "./HomePage.styles";
import LazyHomeContent from "./LazyHomeContent";
import PoroSectionDivider from "./PoroSectionDivider";

function HomePage() {
  const projects = projectsEnabled ? getAllProjects() : [];
  const recentPosts = getTopPosts(3);

  return (
    <HomeMain>
      <SelfDescriptionCard />
      <PoroSectionDivider />
      <LazyHomeContent posts={recentPosts} projects={projects} />
    </HomeMain>
  );
}

export default HomePage;
