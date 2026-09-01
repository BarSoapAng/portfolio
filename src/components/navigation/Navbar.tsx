"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import NavbarLink from "@components/ui/NavbarLink";

const SiteHeader = styled.header`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  width: min(calc(100% - (2 * var(--space-4))), 900px);
  margin-inline: auto;
  padding-block: var(--space-4);
  font-family: var(--font-display);

  > p {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
  }

  > p a {
    text-decoration: none;
  }

  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-pill);
    font-size: var(--font-size-lg);
    text-decoration: none;
  }

  nav a[aria-current="page"] {
    color: var(--color-primary-hover);
    font-weight: var(--font-weight-bold);
  }

  &[data-garden] {
    position: fixed;
    right: var(--space-4);
    bottom: var(--space-4);
    width: auto;
    margin: 0;
    padding: 0;
  }

  &[data-garden] > p {
    display: none;
  }

  &[data-garden] nav ul {
    flex-wrap: nowrap;
  }

  &[data-garden] nav a {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    box-shadow: 0 2px 8px rgba(62, 48, 45, 0.12);
  }
`;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <SiteHeader data-garden={pathname === "/garden" || undefined}>
      <p>
        <Link href="/home">Angela&apos;s World</Link>
      </p>
      <NavbarLink />
    </SiteHeader>
  );
}
