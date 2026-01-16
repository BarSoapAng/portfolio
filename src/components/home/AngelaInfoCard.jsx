import leo from '@assets/leo.gif'
import SparkleHover from './effects/SparkleHover';

export default function AngelaInfoCard() {
  return (
    <div className="w-full bg-[#fffccf] border-2 border-pink-500">
      {/* Header */}
      <div className="border-b-2 border-pink-500 px-4">
        <h2 className="text-red-600 font-bold">
          Information
        </h2>
      </div>

      {/* Row 1 */}
      <div className="flex flex-row justify-between border-b-2 border-pink-400 px-4 py-1">
        <p className=" text-blue-600">
          Height: 165cm
          <br />
          Zodiac: Leo
        </p>
        <img src={leo} className='w-12 h-12'/>
      </div>

      {/* Row 3 */}
      <div className="border-b-2 border-pink-400 px-4 py-2 text-blue-600">
        Chinese Zodiac: Dog
      </div>
 
      {/* Row 4 */}
      <div className="border-b-2 border-pink-400 px-4 py-2 text-purple-500">
        <SparkleHover />
      </div>

      {/* Row 5 */}
      <div className="border-pink-400 px-4 py-2">
        <span className="text-black">Favorite Food:</span>{" "}
        <span className="text-blue-600">japanese beef curry</span>
      </div>
    </div>
  );
}
