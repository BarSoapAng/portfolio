import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import AngelaInfoCard from "@components/home/AngelaInfoCard";
import VinylPlayer from "@components/home/VinylPlayer";
import EmailMeCard from "@components/home/EmailMeCard";
import StatsCard from "@components/home/StatsCard";
import SiteVisitorCounter from "@components/home/SiteVisitorCounter";
import TopBlogOverview from "@components/navigation/TopBlogOverview";

function HomePage() {
  return (
    <main>
      <SelfDescriptionCard />
      <StatsCard />
      <AngelaInfoCard />
      <VinylPlayer />
      <EmailMeCard />
      <TopBlogOverview />
      <SiteVisitorCounter />
    </main>
  );
}

export default HomePage;
