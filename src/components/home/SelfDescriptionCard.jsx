import IllumiHover from './effects/IllumiHover'

import selfie from '@assets/selfie.jpg'
import catJump from '@assets/cat-jump.gif'

export default function RetroHomepageCard() {
  return (
    <div className="w-full bg-[#f6d6a8] border-2 border-[#8b6b4a] p-1 font-mono text-black">
      {/* Top row */}
      <div className="grid grid-cols-[250px_1fr] gap-1">
        {/* Left image box */}
        <div className="w-full h-full min-h-[300px] bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white relative overflow-hidden">
          <img
            src={selfie.src}
            alt="angela's selfie"
            className="absolute w-full h-full object-top-left object-cover"
          />
        </div>

        {/* Right content */}
        <div className="flex flex-col gap-1">
          {/* Header */}
          <div className="flex justify-between bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white py-2 px-4 text-center">
            <img src={catJump.src} className="inline-block w-7" alt="" />
            <h1 className="font-bold text-purple-600">
              Welcome
            </h1>
            <img src={catJump.src} className="inline-block w-7" alt="" />
          </div>

          {/* Subheader */}
          <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white py-1 px-3 text-center">
            <span className="text-blue-600">
              [Angela’s Second Home]
            </span>{" "}
            <span className="text-pink-600">
              [12:00 AM]
            </span>
          </div>

          {/* Website Desc box */}
          <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white py-2 px-3 text-sm">
            <b className="text-green-600">Hello hello!</b> This is a place where I share my experiences, thoughts, and my FAV tried and tested macro-friendly recipes :3
          </div>

          <div>
            {/* Me info */}
            <div className="bg-[#f2c28f] border-2 border-b-0 border-[#8b6b4a] border-b-white py-1 px-3 text-sm">
              I loveee{' '}
              <IllumiHover />
              , playing League of Legends, and coding sites like these. But more than anything, <b>I LOVE FOOD</b>!
            </div>
            <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white py-1 px-3 text-sm">
              I yap too much so if you want to know me better, check out this page {'<3'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
