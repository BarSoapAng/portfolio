import IllumiHover from './effects/IllumiHover'

import selfie from '@assets/selfie.jpg'
import catJump from '@assets/cat-jump.gif'

export default function RetroHomepageCard() {
  return (
    <div className="h-full w-full border-2 border-sand-1 bg-cream-1 p-1 text-black-1">
      {/* Top row */}
      <div className="grid h-full grid-cols-[220px_minmax(0,1fr)] gap-1">
        {/* Left image box */}
        <div className="relative h-full w-full min-h-[300px] overflow-hidden border-2 border-sand-1 border-b-white-1 bg-cream-2">
          <img
            src={selfie.src}
            alt="angela's selfie"
            className="absolute w-full h-full object-top-left object-cover"
          />
        </div>

        {/* Right content */}
        <div className="flex min-h-0 flex-col gap-1">
          {/* Header */}
          <div className="flex justify-between border-2 border-sand-1 border-b-white-1 bg-cream-2 px-4 py-2 text-center">
            <img src={catJump.src} className="inline-block w-7" alt="" />
            <h1 className="font-bold text-purple-1">
              Welcome
            </h1>
            <img src={catJump.src} className="inline-block w-7" alt="" />
          </div>

          {/* Subheader */}
          <div className="border-2 border-sand-1 border-b-white-1 bg-cream-2 px-3 py-1 text-center">
            <span className="text-blue-1">
              [Angela's Second Home]
            </span>{" "}
            <span className="text-pink-1">
              [12:00 AM]
            </span>
          </div>

          {/* Website Desc box */}
          <div className="border-2 border-sand-1 border-b-white-1 bg-cream-2 px-3 py-2 text-sm">
            <b className="text-green-1">Hello hello!</b> This is a place where I share my experiences, thoughts, and my FAV tried and tested macro-friendly recipes :3
          </div>

          <div className='h-full flex flex-col'>
            {/* Me info */}
            <div className="border-2 border-b-0 border-sand-1 border-b-white-1 bg-cream-2 px-3 py-1 text-sm">
              I loveee{' '}
              <IllumiHover />
              , playing League of Legends, and coding sites like these. But more than anything, <b>I LOVE FOOD</b>!
            </div>
            <div className="flex-1 border-2 border-sand-1 border-b-white-1 bg-cream-2 px-3 py-1 text-sm">
              I yap too much so if you want to know me better, check out <a className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full" href="/blog/who-am-i">this page</a> {'<3'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
