import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import AngelaInfoCard from "@components/home/AngelaInfoCard";
import VinylPlayer from "@components/home/VinylPlayer";
import EmailMeCard from "@components/home/EmailMeCard";
import SiteVisitorCounter from "@components/home/SiteVisitorCounter";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import styles from "@components/navigation/TopBlogOverview.module.css";

function HomePage() {
  return (
    <main className={styles.page}>
      <SelfDescriptionCard />
      <AngelaInfoCard />
      <VinylPlayer />
      <EmailMeCard />
      <SiteVisitorCounter />
      <TopBlogOverview />
    </main>
  );
}

export default HomePage;
