"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp, FaMoon } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import styled from "styled-components";

const ToggleRail = styled.div<{ $isGarden: boolean }>`
  position: ${({ $isGarden }) => $isGarden ? "fixed" : "absolute"};
  inset: ${({ $isGarden }) => $isGarden ? "auto var(--space-4) var(--space-4) auto" : "0 0 var(--space-6)"};
  z-index: 10;
  pointer-events: none;
`;

const ButtonStack = styled.div<{ $isGarden: boolean; $isHome: boolean }>`
  position: ${({ $isGarden }) => $isGarden ? "static" : "sticky"};
  top: ${({ $isGarden, $isHome }) =>
    $isGarden
      ? "auto"
      : `calc(100vh - var(--space-4) - ${$isHome ? "5.5rem" : "2.5rem"})`};
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 2.5rem;
  margin-left: ${({ $isGarden }) => $isGarden ? "0" : "auto"};
  margin-right: ${({ $isGarden }) => $isGarden ? "0" : "var(--space-4)"};
`;

const ToggleButton = styled.button<{ $isSun?: boolean }>`
  appearance: none;
  display: flex;
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
  pointer-events: auto;

  &:hover {
    color: ${({ $isSun }) => $isSun ? 'var(--color-primary-hover)' : 'var(--color-primary)'};
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: var(--space-1);
  }
`;

const ScrollToTopButton = styled(ToggleButton)<{ $isVisible: boolean }>`
  visibility: ${({ $isVisible }) => $isVisible ? "visible" : "hidden"};
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: translateY(${({ $isVisible }) => $isVisible ? "0" : "var(--space-2)"});
  font-size: 1rem;
  pointer-events: ${({ $isVisible }) => $isVisible ? "auto" : "none"};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      color 0.2s ease,
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s ease;
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (pathname !== "/home") return;

    const hero = document.querySelector("[data-home-hero]");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShowScrollToTop(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

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

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  if (!mounted) return null;

  return (
    <ToggleRail $isGarden={pathname === "/garden"}>
      <ButtonStack $isGarden={pathname === "/garden"} $isHome={pathname === "/home"}>
        {pathname === "/home" && (
          <ScrollToTopButton
            $isVisible={showScrollToTop}
            aria-label="Scroll to top"
            data-cursor="pointer"
            onClick={scrollToTop}
            tabIndex={showScrollToTop ? 0 : -1}
            type="button"
          >
            <FaArrowUp aria-hidden />
          </ScrollToTopButton>
        )}
        <ToggleButton
          $isSun={theme === "dark"}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          data-cursor="pointer"
          onClick={toggle}
          type="button"
        >
          {theme === "dark" ? <LuSun aria-hidden /> : <FaMoon aria-hidden />}
        </ToggleButton>
      </ButtonStack>
    </ToggleRail>
  );
}
