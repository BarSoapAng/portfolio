"use client";

import NavbarLink from "@components/ui/NavbarLink";

export default function Navbar() {
  return (
    <header className="w-full border-b-3 border-gray-2 bg-white-1 px-1 py-1">
      <div className="flex items-center justify-between gap-3 border-2 border-gray-2 bg-gradient-to-r from-blue-1 via-blue-2 to-paper-2 px-3 py-1.5 text-paper-2">
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
