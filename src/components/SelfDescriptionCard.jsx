import IllumiHover from '@components/IllumiHover'

import selfie from '@assets/selfie.jpg'
import catJump from '@assets/cat-jump.gif'

export default function RetroHomepageCard() {
  return (
    <div className="w-full max-w-2xl bg-[#f6d6a8] border-4 border-[#8b6b4a] p-1 font-mono text-black">
      {/* Top row */}
      <div className="grid grid-cols-[250px_1fr] gap-1">
        {/* Left image box */}
        <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] flex items-center justify-center">
          <img
            src={selfie}
            alt="angela's selfie"
            className="w-full h-[300px] object-cover object-top-left"
          />
        </div>

        {/* Right content */}
        <div className="flex flex-col gap-1">
          {/* Header */}
          <div className="flex justify-between bg-[#f2c28f] border-2 border-[#8b6b4a] py-2 px-4 text-center">
            <img src={catJump} className="inline-block w-7" />
            <h1 className="font-bold text-purple-600">
              Welcome
            </h1>
            <img src={catJump} className="inline-block w-7" />
          </div>

          {/* Subheader */}
          <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] py-1 px-3 text-center">
            <span className="text-blue-600">
              [Angela’s Second Home]
            </span>{" "}
            <span className="text-pink-600">
              [12:00 AM]
            </span>
          </div>

          {/* Website Desc box */}
          <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] py-2 px-3 text-sm">
            <b className="text-green-600">Hello hello!</b> This is a place where I share my experiences, thoughts, and my FAV tried and tested macro-friendly recipes :3
          </div>

          <div>
            {/* Me info */}
            <div className="bg-[#f2c28f] border-2 border-b-0 border-[#8b6b4a] py-1 px-3 text-sm">
              I loveee{' '}
              <IllumiHover />
              , playing League of Legends, and coding sites like these. But more than anything, <b>I LOVE FOOD</b>!
            </div>
            <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] py-1 px-3 text-sm">
              I yap too much for here so if you want to know me better, check out this page {'<3'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
