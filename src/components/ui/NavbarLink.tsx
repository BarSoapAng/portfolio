"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../routes";

export default function NavbarLink({ className = "" }) {
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
              "inline-flex min-w-[86px] border-2 border-gray-2 bg-blue-2 px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition hover:bg-blue-2/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-1 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2",
              isActive ? "bg-sand-2 text-black-1 shadow-inset-sand" : "",
            ].join(" ")}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
