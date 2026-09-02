"use client";

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import styled from "styled-components";

const ToggleButton = styled.button`
  appearance: none;
  position: fixed;
  z-index: 10;
  right: var(--space-4);
  bottom: var(--space-4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
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

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getTheme());
    setMounted(true);
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
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-cursor="pointer"
      onClick={toggle}
      type="button"
    >
      {theme === "dark" ? <LuSun aria-hidden /> : <FaMoon aria-hidden />}
    </ToggleButton>
  );
}
