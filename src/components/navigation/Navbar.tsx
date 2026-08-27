"use client";

import Link from "next/link";
import styled from "styled-components";
import NavbarLink from "@components/ui/NavbarLink";

const SiteHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-4) max(var(--space-4), calc((100vw - 1000px) / 2));
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

  @media (max-width: 42rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export default function Navbar() {
  return (
    <SiteHeader>
      <p>
        <Link href="/home">Angela&apos;s Universe</Link>
      </p>
      <NavbarLink />
    </SiteHeader>
  );
}
