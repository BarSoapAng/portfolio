import SelfDescriptionCard from "@components/home/SelfDescriptionCard";
import AngelaInfoCard from "@components/home/AngelaInfoCard";
import VinylPlayer from "@components/home/VinylPlayer";
import EmailMeCard from "@components/home/EmailMeCard";
import StatsCard from "@components/home/StatsCard";
import SiteVisitorCounter from "@components/home/SiteVisitorCounter";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import wavingCat from "@assets/home/cat_waving.gif";

function HomePage() {
  return (
    <div className="min-h-full p-3 sm:p-4">
      <div className="mx-auto grid h-full w-full max-w-[1400px] gap-3 lg:grid-cols-[220px_minmax(0,1.6fr)_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1.6fr)_460px]">
        {/* Left rail */}
        <div className="flex flex-col gap-3 lg:justify-between">
          <TopBlogOverview />
          <SiteVisitorCounter />
        </div>

        {/* Center column */}
        <div className="flex min-h-0 flex-col gap-3">
          <div className="min-h-0 flex-1">
            <SelfDescriptionCard />
          </div>
          <div className="min-h-0">
            <StatsCard />
          </div>
        </div>

        {/* Right column */}
        <div className="grid grid-rows-[auto_auto_auto] gap-3">
          <AngelaInfoCard />
          <VinylPlayer />
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-sm">
              <img
                src={wavingCat.src}
                className="h-full w-full border-2 border-sand-1 bg-cream-1 object-contain"
                alt="A pixel cat waving hello"
              />
            </div>
            <EmailMeCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
