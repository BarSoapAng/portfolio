"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { FaMoon } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import styled from "styled-components";

const ToggleRail = styled.div<{ $isGarden: boolean }>`
  position: ${({ $isGarden }) => $isGarden ? "fixed" : "absolute"};
  inset: ${({ $isGarden }) => $isGarden ? "auto var(--space-4) var(--space-4) auto" : "0 0 var(--space-6)"};
  z-index: 10;
  pointer-events: none;
`;

const ToggleButton = styled.button<{ $isGarden: boolean; $isSun?: boolean }>`
  appearance: none;
  position: ${({ $isGarden }) => $isGarden ? "static" : "sticky"};
  top: ${({ $isGarden }) => $isGarden ? "auto" : "calc(100vh - var(--space-4) - 2.5rem)"};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  margin-left: ${({ $isGarden }) => $isGarden ? "0" : "auto"};
  margin-right: ${({ $isGarden }) => $isGarden ? "0" : "var(--space-4)"};
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
  const pathname = usePathname();
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
    }, 300);
  }

  if (!mounted) return null;

  return (
    <ToggleRail $isGarden={pathname === "/garden"}>
      <ToggleButton
        $isGarden={pathname === "/garden"}
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
