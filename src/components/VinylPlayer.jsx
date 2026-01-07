export default function VinylPlayer() {
  return (
    <div className="w-full max-w-xl bg-[#f6d6a8] border-4 border-black p-3 font-mono text-black">
      <div className="flex gap-4 items-center">
        {/* Vinyl */}
        <div className="relative w-24 h-24 shrink-0">
          {/* Outer vinyl */}
          <div className="absolute inset-0 rounded-full bg-black animate-spin-slow" />

          {/* Vinyl grooves */}
          <div className="absolute inset-2 rounded-full border border-gray-700" />
          <div className="absolute inset-4 rounded-full border border-gray-700" />

          {/* Center label */}
          <div className="absolute inset-8 rounded-full bg-[#f2c28f] border-2 border-black" />
        </div>

        {/* Right content */}
        <div className="flex flex-col flex-1 gap-2">
          {/* Song info */}
          <div>
            <div className="text-sm font-bold">Song name</div>
            <div className="text-xs opacity-80">artist</div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-[#e5b97c] border-2 border-black">
            <div className="h-full w-1/3 bg-black" />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 text-sm">
            <button className="px-2 border-2 border-black bg-[#f2c28f] active:translate-y-[1px]">
              ◀
            </button>
            <button className="px-2 border-2 border-black bg-[#f2c28f] active:translate-y-[1px]">
              ❚❚
            </button>
            <button className="px-2 border-2 border-black bg-[#f2c28f] active:translate-y-[1px]">
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
