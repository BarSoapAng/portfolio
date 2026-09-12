"use client";

import { useState, useSyncExternalStore } from "react";
import { FaMoon } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import styled from "styled-components";

const ToggleRail = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
`;

const ToggleButton = styled.button<{ $isSun?: boolean }>`
  appearance: none;
  position: sticky;
  top: calc(100vh - var(--space-4) - 2.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  margin-left: auto;
  margin-right: var(--space-4);
  border: 0;
  background: transparent;
  color: ${({ $isSun }) => $isSun ? 'var(--color-primary)' : 'var(--color-text-muted)'};
  font-size: 1.35rem;
  cursor: pointer;
  pointer-events: auto;

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
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.add("theme-transition");
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  }

  if (!mounted) return null;

  return (
    <ToggleRail>
      <ToggleButton
        $isSun={theme === "dark"}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        data-cursor="pointer"
        onClick={toggle}
        type="button"
      >
        {theme === "dark" ? <LuSun aria-hidden /> : <FaMoon aria-hidden />}
      </ToggleButton>
    </ToggleRail>
  );
}
