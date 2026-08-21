import localFont from "next/font/local";

const amaticSc = localFont({
  display: "swap",
  src: [
    { path: "../assets/fonts/amatic-sc-regular-latin.woff2", weight: "400" },
    { path: "../assets/fonts/amatic-sc-bold-latin.woff2", weight: "700" },
  ],
});

const nunito = localFont({
  display: "swap",
  src: "../assets/fonts/nunito-latin.woff2",
  weight: "200 700",
});

export const font = {
  family: {
    display: amaticSc.style.fontFamily,
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
