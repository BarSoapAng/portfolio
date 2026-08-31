"use client";

import { FaAt, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import styled from "styled-components";

const Socials = styled.nav`
  width: min(calc(100% - (2 * var(--space-4))), 900px);
  margin-inline: auto;
  padding-block: 0 var(--space-8);

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: inline-flex;
    color: var(--color-accent);
    font-size: var(--font-size-xl);

    svg {
      width: 1em;
      height: 1em;
      display: block;
    }
  }

  a[aria-label="Email"] svg {
    transform: scale(1.12);
    transform-origin: center;
    overflow: visible;
  }

  a[aria-label="Email"] svg path {
    stroke: currentColor;
    stroke-width: 24;
    paint-order: stroke fill;
  }
`;

export default function SocialLinks() {
  return (
    <Socials aria-label="Social media">
      <ul>
        <li>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/ang018/">
            <FaLinkedinIn aria-hidden />
          </a>
        </li>
        <li>
          <a aria-label="GitHub" href="https://github.com/BarSoapAng">
            <FaGithub aria-hidden />
          </a>
        </li>
        <li>
          <a aria-label="X" href="https://x.com/barsoapang">
            <FaXTwitter aria-hidden />
          </a>
        </li>
        <li>
          <a aria-label="Instagram" href="https://www.instagram.com/barsoapang">
            <FaInstagram aria-hidden />
          </a>
        </li>
        <li>
          <a aria-label="Email" href="mailto:a229zhou@uwaterloo.ca">
            <FaAt aria-hidden />
          </a>
        </li>
      </ul>
    </Socials>
  );
}
