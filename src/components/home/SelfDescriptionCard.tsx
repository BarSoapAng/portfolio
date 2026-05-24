import IllumiHover from "./effects/IllumiHover";
import LiveClock from "./LiveClock";

import selfie from "@assets/home/selfie.jpg";
import catJump from "@assets/home/cat-jump.gif";

export default function SelfDescriptionCard() {
  return (
    <div className="h-full w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
      <div className="h-full w-full border-2 border-sand-1 bg-cream-1 p-1 text-black-1">
        <div className="grid h-full gap-1 sm:grid-cols-[220px_minmax(0,1fr)]">
          {/* Left image box */}
          <div className="relative h-full min-h-[260px] w-full overflow-hidden border-2 border-sand-1 bg-cream-2">
            <img
              src={selfie.src}
              alt="Angela's selfie"
              className="absolute inset-0 h-full w-full object-cover object-[left_top]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-paper-1/30"
            />
          </div>

          {/* Right content */}
          <div className="flex min-h-0 flex-col gap-1">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-2 border-sand-1 bg-cream-2 px-4 py-2">
              <img src={catJump.src} className="inline-block w-7" alt="" />
              <h1 className="m-0 text-center text-2xl font-bold tracking-tight text-purple-1">
                Welcome
              </h1>
              <img src={catJump.src} className="inline-block w-7" alt="" />
            </div>

            {/* Subheader */}
            <div className="flex items-center justify-center gap-2 border-2 border-sand-1 bg-cream-2 px-3 py-1 text-center text-sm">
              <span className="text-blue-1">[Angela&apos;s Second Home]</span>
              <span className="text-pink-1">
                [<LiveClock />]
              </span>
            </div>

            {/* Website Desc box */}
            <div className="border-2 border-sand-1 bg-cream-2 px-3 py-2 text-sm leading-relaxed">
              <b className="text-green-1">Hello hello!</b> This is a place where I share my
              experiences, thoughts, and my FAV tried and tested macro-friendly recipes :3
            </div>

            {/* Me info */}
            <div className="flex flex-1 flex-col">
              <div className="border-2 border-b-0 border-sand-1 bg-cream-2 px-3 py-1 text-sm leading-relaxed">
                I loveee <IllumiHover />, playing League of Legends, and coding sites like
                these. But more than anything, <b>I LOVE FOOD</b>!
              </div>
              <div className="flex-1 border-2 border-sand-1 bg-cream-2 px-3 py-1 text-sm leading-relaxed">
                I yap too much so if you want to know me better, check out{" "}
                <a
                  className="relative inline-block font-semibold text-blue-1 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-red-1 after:transition-all after:duration-300 hover:after:w-full"
                  href="/blog/who-am-i"
                >
                  this page
                </a>{" "}
                {"<3"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
