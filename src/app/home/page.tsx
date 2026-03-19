import SelfDescriptionCard from '@components/home/SelfDescriptionCard'
import AngelaInfoCard from '@components/home/AngelaInfoCard'
import VinylPlayer from '@components/home/VinylPlayer'
import EmailMeCard from '@components/home/EmailMeCard'
import StatsCard from '@components/home/StatsCard'
import SiteVisitorCounter from '@components/home/SiteVisitorCounter'
import TopBlogOverview from '@components/navigation/TopBlogOverview'

import wavingCat from '@assets/cat_waving.gif'

function HomePage() {
  return (
    <div className="h-full overflow-hidden p-4">
      <div className="grid h-full grid-cols-[200px_minmax(0,1.6fr)_450px] gap-3">
        <div className="flex flex-col justify-between">
          <TopBlogOverview />
          <SiteVisitorCounter />
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <div className="min-h-0 flex-1">
            <SelfDescriptionCard />
          </div>
          <div className="min-h-0">
            <StatsCard />
          </div>
        </div>

        <div className="col-start-3 grid grid-rows-[auto_auto_auto] gap-2 border">
          <div className="row-start-1 border"><AngelaInfoCard /></div>
          <div className="row-start-2 border"><VinylPlayer /></div>
          <div className="row-start-3 grid grid-cols-2 gap-2">
            <div className="border">
              <img src={wavingCat.src} className="border-2 border-red-1" alt="Waving cat" />
            </div>
            <div className="border">
              <EmailMeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
