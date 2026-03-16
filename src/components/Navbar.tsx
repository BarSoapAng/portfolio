"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../routes";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b-3 border-[#2a3f4e] bg-[#FFFFFF] px-1 py-1">
      <div className="flex items-center justify-between gap-3 border-2 border-[#1f3442] bg-gradient-to-r from-[#2b7b9f] via-[#56aec3] to-[#8dd8dc] px-3 py-1.5 text-[#f3f6e7]">
        <h2 className="m-0 text-sm font-bold tracking-wide sm:text-base">
          Angela&apos;s Universe
        </h2>
        <div className="flex items-center gap-1">
          <nav className="flex flex-wrap items-center justify-end gap-2">
            {routes.map((page) => {
              const isActive = pathname === page.path;

              return (
                <Link
                  key={page.path}
                  href={page.path}
                  className={[
                    "min-w-[86px] border-2 px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.08em] transition",
                    "border-[#1f3442] bg-[#84c8d7] text-[#193746]",
                    "[box-shadow:inset_2px_2px_0_#d9f4f6,inset_-2px_-2px_0_#3d6b7a]",
                    "hover:bg-[#9ed9e5]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7b9f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1e2]",
                    isActive
                      ? "bg-[#f2cf83] text-[#3f2b00] [box-shadow:inset_2px_2px_0_#fff1cc,inset_-2px_-2px_0_#bf8f39]"
                      : "",
                  ].join(" ")}
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
