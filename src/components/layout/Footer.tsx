"use client";

import styled from "styled-components";
import { BodySmall } from "@components/ui/Typography";

const SiteFooter = styled.footer`
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border-block-start: 1px solid var(--color-accent);
  background: var(--color-accent);
  color: var(--color-on-primary);
  text-align: center;

  p {
    margin: 0;
  }
`;

export default function Footer() {
  return (
    <SiteFooter>
      <BodySmall>© Angela 2026 · Made with love {"<3"}</BodySmall>
    </SiteFooter>
  );
}
