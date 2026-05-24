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
      <div
        className={[
          "mx-auto flex w-full max-w-[1400px] flex-col gap-3",
          // Tablet: 2-col with left rail
          "md:grid md:grid-cols-[220px_minmax(0,1fr)] md:items-start",
          // Desktop: 3 columns, fill viewport height
          "lg:h-full lg:grid-cols-[220px_minmax(0,1.6fr)_minmax(0,1fr)]",
          "xl:grid-cols-[230px_minmax(0,1.6fr)_460px]",
        ].join(" ")}
      >
        {/* CENTER: main intro */}
        <section
          className={[
            "order-1 flex min-h-0 flex-col gap-3",
            "md:order-none md:col-start-2 md:row-start-1",
            "lg:col-start-2 lg:row-start-1 lg:row-span-2",
          ].join(" ")}
        >
          <div className="lg:min-h-0 lg:flex-1">
            <SelfDescriptionCard />
          </div>
          <div>
            <StatsCard />
          </div>
        </section>

        {/* RIGHT: info / vinyl / cat+email */}
        <section
          className={[
            "order-2 flex flex-col gap-3",
            "md:order-none md:col-start-2 md:row-start-2",
            "lg:col-start-3 lg:row-start-1 lg:row-span-2",
          ].join(" ")}
        >
          <AngelaInfoCard />
          <VinylPlayer />
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-sm">
              <div className="flex h-full w-full items-center justify-center border-2 border-sand-1 bg-cream-1">
                <img
                  src={wavingCat.src}
                  className="h-full w-full object-contain"
                  alt="A pixel cat waving hello"
                />
              </div>
            </div>
            <EmailMeCard />
          </div>
        </section>

        {/* LEFT: top blogs + visitor counter */}
        <aside
          className={[
            "order-3 flex flex-col gap-3",
            "md:order-none md:col-start-1 md:row-start-1 md:row-span-2 md:self-stretch",
            "lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:justify-between",
          ].join(" ")}
        >
          <TopBlogOverview />
          <SiteVisitorCounter />
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
