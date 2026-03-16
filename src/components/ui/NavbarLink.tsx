"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../routes";

type NavbarLinkProps = {
  className?: string;
};

export default function NavbarLink({ className = "" }: NavbarLinkProps) {
  const pathname = usePathname();

  return (
    <nav
      className={[
        "flex flex-wrap items-center justify-end gap-2",
        className,
      ].join(" ")}
    >
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
  );
}
