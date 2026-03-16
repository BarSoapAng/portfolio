import SelfDescriptionCard from '@components/home/SelfDescriptionCard'
import AngelaInfoCard from '@components/home/AngelaInfoCard'
import VinylPlayer from '@components/home/VinylPlayer'
import EmailMeCard from '@components/home/EmailMeCard'
import StatsCard from '@components/home/StatsCard'
import FoodMenuCard from '@components/home/FoodMenuCard'

import wavingCat from '@assets/cat_waving.gif'

function HomePage() {
  return (
    <div className="h-full overflow-hidden p-4">
      <div className="grid h-full grid-cols-[240px_minmax(0,1.6fr)_320px] gap-3">
        <div className="min-h-0">
          <FoodMenuCard />
        </div>

        <div className="grid min-h-0 grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-3">
          <div className="min-h-0">
            <SelfDescriptionCard />
          </div>
          <div className="min-h-0">
            <StatsCard />
          </div>
        </div>

        <div className="grid grid-rows-[auto_auto_auto] col-start-3 border gap-2">
          <div className="row-start-1 border"><AngelaInfoCard /></div>
          <div className="row-start-2 border"><VinylPlayer /></div>
          <div className="row-start-3 grid grid-cols-2 gap-2">
            <div className="border">
              <img src={wavingCat.src} className='border-2 border-red-1' alt="Waving cat" />
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
