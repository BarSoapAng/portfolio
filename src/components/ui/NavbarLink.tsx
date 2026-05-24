"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../routes";

export default function NavbarLink({ className = "" }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={[
        "flex flex-wrap items-center justify-end gap-1.5 sm:gap-2",
        className,
      ].join(" ")}
    >
      {routes.map((page) => {
        const isActive = pathname === page.path || pathname?.startsWith(page.path + "/");

        return (
          <Link
            key={page.path}
            href={page.path}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex min-w-[52px] items-center justify-center border-2 border-gray-2 px-2 py-1 text-center text-[11px] font-bold uppercase tracking-[0.08em] transition-transform duration-100 sm:min-w-[86px] sm:px-3 sm:text-xs",
              "hover:-translate-y-0.5 active:translate-y-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper-1 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-1",
              isActive
                ? "bg-sand-2 text-black-1 shadow-inset-sand"
                : "bg-blue-2 text-gray-2 shadow-inset-blue hover:bg-blue-2/85",
            ].join(" ")}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
