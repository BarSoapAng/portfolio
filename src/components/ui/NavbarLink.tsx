"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../routes";

export default function NavbarLink() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul>
        {routes.map((page) => {
          const isActive = pathname === page.path || pathname?.startsWith(page.path + "/");

          return (
            <li key={page.path}>
              <Link href={page.path} aria-current={isActive ? "page" : undefined}>
                {page.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
