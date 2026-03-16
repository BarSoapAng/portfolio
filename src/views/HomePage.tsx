import SelfDescriptionCard from '@components/home/SelfDescriptionCard'
import AngelaInfoCard from '@components/home/AngelaInfoCard'
import VinylPlayer from '@components/home/VinylPlayer'
import EmailMeCard from '@components/home/EmailMeCard'
import StatsCard from '@components/home/StatsCard'
import TopBlogOverview from '@components/home/TopBlogOverview'

import wavingCat from '@assets/cat_waving.gif'

function HomePage() {
  return (
    <>
      <div className="grid grid-cols-[0.4fr_1.5fr_1fr] gap-2 m-5 items-start">
        <div className="col-start-1">
          <TopBlogOverview />
        </div>

        <div className="grid grid-rows-[auto_auto] col-start-2 border gap-2">
          <div className="row-start-1 border"><SelfDescriptionCard /></div>
          <div className="row-start-2 border"><StatsCard /></div>
        </div>

        <div className="grid grid-rows-[auto_auto_auto] col-start-3 border gap-2">
          <div className="row-start-1 border"><AngelaInfoCard /></div>
          <div className="row-start-2 border"><VinylPlayer /></div>
          <div className="row-start-3 grid grid-cols-2 gap-2">
            <div className="border">
              <img src={wavingCat.src} className='border-2 border-red-300' alt="Waving cat" />
            </div>
            <div className="border"><EmailMeCard /></div>
          </div>
        </div>        
      </div>
    </>
  )
}

export default HomePage
