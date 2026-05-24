import leo from "@assets/home/leo.gif";
import SparkleHover from "./effects/SparkleHover";

export default function AngelaInfoCard() {
  return (
    <div className="h-full w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
      <div className="h-full w-full border-2 border-pink-1 bg-paper-1">
        {/* Header */}
        <div className="border-b-2 border-pink-1 bg-gradient-to-r from-pink-1/15 via-paper-1 to-pink-1/15 px-3 py-1 sm:px-4">
          <h2 className="m-0 text-base font-bold tracking-tight text-red-1 sm:text-lg">
            ♡ Information ♡
          </h2>
        </div>

        {/* Row 1 */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-pink-1 px-3 py-2 sm:px-4">
          <p className="m-0 text-sm leading-snug text-blue-1">
            <span className="font-semibold">Height:</span> 165cm
            <br />
            <span className="font-semibold">Zodiac:</span> Leo
          </p>
          <img src={leo.src} className="h-12 w-12 object-contain" alt="Leo zodiac" />
        </div>

        {/* Row 2 */}
        <div className="border-b-2 border-pink-1 px-3 py-2 text-sm text-blue-1 sm:px-4">
          <span className="font-semibold">Chinese Zodiac:</span> Dog
        </div>

        {/* Row 3 (sparkle) */}
        <div className="border-b-2 border-pink-1 px-3 py-2 text-sm sm:px-4">
          <SparkleHover />
        </div>

        {/* Row 4 */}
        <div className="px-3 py-2 text-sm sm:px-4">
          <span className="font-semibold text-black-1">Favorite Food:</span>{" "}
          <span className="text-blue-1">japanese beef curry</span>
        </div>
      </div>
    </div>
  );
}
