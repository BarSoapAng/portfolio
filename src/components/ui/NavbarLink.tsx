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
              "retro-button min-w-[86px] text-center",
              isActive ? "retro-button-active" : "",
            ].join(" ")}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
