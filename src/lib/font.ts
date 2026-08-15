import { Amatic_SC } from "next/font/google";

const amaticSc = Amatic_SC({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const font = {
  family: {
    display: amaticSc.style.fontFamily,
    body: '"Avenir Next", Avenir, "Segoe UI", sans-serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "clamp(2.25rem, 6vw, 4rem)",
  },
  weight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.15,
    normal: 1.6,
    relaxed: 1.75,
  },
} as const;
