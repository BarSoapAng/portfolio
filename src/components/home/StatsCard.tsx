import RadarChart from "./effects/RadarChart";
import { PiCoffeeLight, PiCoffeeFill } from "react-icons/pi";

const stats = [
  { label: "Archetype", value: "Shapeshifter" },
  { label: "Impressions", value: "4M+" },
  { label: "Projects", value: "9" },
];

const CAFFEINE_LEVEL = 2;
const CAFFEINE_MAX = 5;

export default function StatsCard() {
  return (
    <div className="h-full w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
      <div className="h-full w-full border-2 border-green-3 bg-green-2 p-1 font-mono text-gray-2">
        <div className="grid h-full gap-1 sm:grid-cols-[minmax(0,1fr)_220px]">
          <div className="flex flex-col gap-1 text-sm">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="flex min-h-10 items-center justify-between gap-3 border-2 border-green-3 bg-paper-1 px-3 py-1.5"
              >
                <span className="font-bold text-purple-1">{label}:</span>
                <span className="text-right text-gray-2">{value}</span>
              </div>
            ))}

            <div className="flex min-h-10 items-center justify-between gap-3 border-2 border-green-3 bg-paper-1 px-3 py-1.5">
              <span className="font-bold text-purple-1">Caffeination:</span>
              <div
                className="flex items-center gap-1 text-green-3"
                role="img"
                aria-label={`Caffeine level: ${CAFFEINE_LEVEL} of ${CAFFEINE_MAX}`}
              >
                {Array.from({ length: CAFFEINE_MAX }).map((_, index) =>
                  index < CAFFEINE_LEVEL ? (
                    <PiCoffeeFill key={index} className="h-4 w-4" />
                  ) : (
                    <PiCoffeeLight key={index} className="h-4 w-4 opacity-50" />
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="hidden h-full min-h-0 border-2 border-green-3 bg-paper-1 px-2 py-2 sm:block">
            <RadarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
