"use client";

import NavbarLink from "@components/ui/NavbarLink";

export default function Navbar() {
  return (
    <header className="w-full border-b-3 border-[#2a3f4e] bg-[#FFFFFF] px-1 py-1">
      <div className="flex items-center justify-between gap-3 border-2 border-[#1f3442] bg-gradient-to-r from-[#2b7b9f] via-[#56aec3] to-[#8dd8dc] px-3 py-1.5 text-[#f3f6e7]">
        <h2 className="m-0 text-sm font-bold tracking-wide sm:text-base">
          Angela&apos;s Universe
        </h2>
        <div className="flex items-center gap-1">
          <NavbarLink />
        </div>
      </div>
    </header>
  );
}
