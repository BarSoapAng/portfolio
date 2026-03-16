import RadarChart from './effects/RadarChart'
import { PiCoffeeLight, PiCoffeeFill } from "react-icons/pi";

const stats = [
  { label: 'Archetype', value: 'Shapeshifter' },
  { label: 'Impressions', value: '4M+' },
  { label: 'Projects', value: '9' },
]

export default function StatsCard() {
  return (
    <div className="h-full w-full bg-green-200 border-2 border-green-800 p-1 font-mono text-black">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_220px] gap-1">
        <div className="flex flex-col gap-1 text-sm">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex min-h-10 items-center justify-between gap-3 border-2 border-green-800 border-b-white px-3 py-1.5"
            >
              <span className="font-bold text-purple-600">
                {label}:
              </span>
              <span className="text-right text-black">
                {value}
              </span>
            </div>
          ))}

          <div className="flex min-h-10 items-center justify-between gap-3 border-2 border-green-800 border-b-white px-3 py-1.5">
            <span className="font-bold text-purple-600">
              Caffeination:
            </span>
            <div className="flex items-center gap-1 text-green-500">
              <PiCoffeeFill className="h-4 w-4" />
              <PiCoffeeFill className="h-4 w-4" />
              <PiCoffeeLight className="h-4 w-4" />
              <PiCoffeeLight className="h-4 w-4" />
              <PiCoffeeLight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="h-full min-h-0 border-2 border-green-800 border-b-white px-2 py-2">
          <RadarChart />
        </div>
      </div>
    </div>
  );
}
