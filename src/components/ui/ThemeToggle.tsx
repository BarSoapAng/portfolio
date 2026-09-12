"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FaMoon } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import styled from "styled-components";

const ToggleButton = styled.button<{ $isSun?: boolean }>`
  appearance: none;
  position: absolute;
  z-index: 10;
  right: var(--space-4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $isSun }) => $isSun ? 'var(--color-primary)' : 'var(--color-text-muted)'};
  font-size: 1.35rem;
  cursor: pointer;

  &:hover {
    color: ${({ $isSun }) => $isSun ? 'var(--color-primary-hover)' : 'var(--color-primary)'};
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: var(--space-1);
  }
`;

function getTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToHydration() {
  return () => {};
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  useEffect(() => {
    const button = buttonRef.current;
    const hero = document.querySelector("[data-theme-toggle-start]") ?? document.querySelector("main");
    const footer = document.querySelector("[data-theme-toggle-end]");

    if (!button || !hero || !footer) return;

    const updatePosition = () => {
      const spacing = 16;
      const heroTop = hero.getBoundingClientRect().top + window.scrollY;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const viewportPosition = window.scrollY + window.innerHeight - button.offsetHeight - spacing;
      button.style.top = `${Math.min(Math.max(viewportPosition, heroTop), footerTop - button.offsetHeight - spacing)}px`;
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  if (!mounted) return null;

  return (
    <ToggleButton
      ref={buttonRef}
      $isSun={theme === "dark"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-cursor="pointer"
      onClick={toggle}
      type="button"
    >
      {theme === "dark" ? <LuSun aria-hidden /> : <FaMoon aria-hidden />}
    </ToggleButton>
  );
}
