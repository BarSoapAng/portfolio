import { Berkshire_Swash, Nunito } from "next/font/google";

const berkshireSwash = Berkshire_Swash({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  display: "swap",
  subsets: ["latin"],
  weight: ["200", "500", "700"],
});

export const font = {
  family: {
    display: berkshireSwash.style.fontFamily,
    body: nunito.style.fontFamily,
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
    regular: 200,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.15,
    normal: 1.6,
    relaxed: 1.75,
  },
} as const;
