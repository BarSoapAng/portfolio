"use client";

import Link from "next/link";
import NavbarLink from "@components/ui/NavbarLink";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gray-2 bg-paper-1/95 px-1 py-1 shadow-retro-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-gray-2 bg-gradient-to-r from-purple-1 via-pink-1 to-sand-2 px-2 py-1.5 text-paper-1 sm:gap-3 sm:px-3">
        <Link
          href="/home"
          className="m-0 inline-flex shrink-0 items-center gap-1.5 text-sm font-bold tracking-wide drop-shadow-[1px_1px_0_rgba(0,0,0,0.25)] transition hover:opacity-90 sm:gap-2 sm:text-base"
        >
          <span aria-hidden className="text-cream-1">
            ★
          </span>
          <span className="sm:hidden">Angela&apos;s</span>
          <span className="hidden sm:inline">Angela&apos;s Universe</span>
          <span aria-hidden className="hidden text-cream-1 sm:inline">
            ★
          </span>
        </Link>
        <div className="flex min-w-0 items-center gap-1">
          <NavbarLink />
        </div>
      </div>
    </header>
  );
}
