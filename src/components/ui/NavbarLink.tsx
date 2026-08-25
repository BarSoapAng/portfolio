"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookOpen, FaHouse } from "react-icons/fa6";
import { routes } from "../../routes";

export default function NavbarLink() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul>
        {routes.map((page) => {
          const isActive =
            pathname === page.activePath || pathname?.startsWith(page.activePath + "/");

          return (
            <li key={page.path}>
              <Link
                aria-current={isActive ? "page" : undefined}
                aria-label={page.label}
                href={page.path}
              >
                {page.path === "/home" ? <FaHouse aria-hidden /> : <FaBookOpen aria-hidden />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
