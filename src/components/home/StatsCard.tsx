import RadarChart from './effects/RadarChart'
import { PiCoffeeLight, PiCoffeeFill } from "react-icons/pi";

export default function StatsCard() {
  return (
    <div className="w-full border-2 border-green-800 bg-green-200 p-1 text-black-1">

      <div className="grid grid-cols-[auto_auto] gap-1">
        <div className="flex flex-col gap-1">
          
          <div className="border-2 border-green-800 border-b-white-1 py-2 px-4">
            <span className="font-bold text-purple-1">
              Archetype:
            </span>
            <span className='text-black-1'> Shapeshifter</span>
          </div>

          <div className="border-2 border-green-800 border-b-white-1 py-2 px-4">
            <span className="font-bold text-purple-1">
              Impressions:
            </span>
            <span className='text-black-1'> 4M+</span>
          </div>

          <div className="border-2 border-green-800 border-b-white-1 py-2 px-4">
            <span className="font-bold text-purple-1">
              Projects: 
            </span>
            <span className='text-black-1'> 9</span>
          </div>

          <div className="flex border-2 border-green-800 border-b-white-1 py-2 px-4">
            <span className="font-bold text-purple-1">
              Caffeination: 
            </span>
            <PiCoffeeFill className='w-5 text-green-800'/>
            <PiCoffeeFill className='w-5 text-green-800'/>
            <PiCoffeeLight />
            <PiCoffeeLight />
            <PiCoffeeLight />
          </div>
        </div>

        <div className="h-[240px] w-[275px] overflow-hidden border-2 border-green-800 border-b-white-1">
          <RadarChart />
        </div>
      </div>
    </div>
  );
}
