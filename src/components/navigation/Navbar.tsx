"use client";

import Link from "next/link";
import styled from "styled-components";
import NavbarLink from "@components/ui/NavbarLink";
import { DisplayStrong } from "@components/ui/Typography";
import { mediaQuery } from "@lib/media";

const SiteHeader = styled.header`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  width: min(calc(100% - (2 * var(--space-4))), 900px);
  height: var(--navbar-height);
  margin-inline: auto;
  padding-block: var(--space-4);

  > p {
    margin: 0;
    white-space: nowrap;
  }

  > p a {
    text-decoration: none;
  }

  nav ul {
    display: flex;
    flex-wrap: nowrap;
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

  @media ${mediaQuery.largeMobile} {
    gap: var(--space-2);

    nav ul {
      gap: var(--space-1);
    }

    nav a {
      padding-inline: var(--space-2);
    }
  }
`;

export default function Navbar() {
  return (
    <SiteHeader>
      <DisplayStrong as="p">
        <Link href="/home">Angela&apos;s World</Link>
      </DisplayStrong>
      <NavbarLink />
    </SiteHeader>
  );
}
