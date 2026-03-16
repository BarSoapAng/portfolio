import leo from '@assets/leo.gif'
import SparkleHover from './effects/SparkleHover';

export default function AngelaInfoCard() {
  return (
    <div className="h-full w-full border-2 border-pink-500 bg-paper-1">
      {/* Header */}
      <div className="border-b-2 border-pink-1 px-4">
        <h2 className="font-bold text-red-1">
          Information
        </h2>
      </div>

      {/* Row 1 */}
      <div className="flex flex-row justify-between border-b-2 border-pink-1 px-4 py-1">
        <p className="text-blue-1">
          Height: 165cm
          <br />
          Zodiac: Leo
        </p>
        <img src={leo.src} className='w-12 h-12' alt="Leo" />
      </div>

      {/* Row 3 */}
      <div className="border-b-2 border-pink-1 px-4 py-2 text-blue-1">
        Chinese Zodiac: Dog
      </div>
 
      {/* Row 4 */}
      <div className="border-b-2 border-pink-1 px-4 py-2 text-purple-1">
        <SparkleHover />
      </div>

      {/* Row 5 */}
      <div className="border-pink-1 px-4 py-2">
        <span className="text-black-1">Favorite Food:</span>{" "}
        <span className="text-blue-1">japanese beef curry</span>
      </div>
    </div>
  );
}
