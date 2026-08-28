import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import GlobalStyle from "./GlobalStyle";
import Footer from "@components/layout/Footer";
import SocialLinks from "@components/layout/SocialLinks";
import Navbar from "@components/navigation/Navbar";
import { colors } from "@lib/colors";
import { font } from "@lib/font";
import { radius } from "@lib/radius";
import { spacing } from "@lib/spacing";
import StyledComponentsRegistry from "@lib/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "Angela's Universe",
  description: "Portfolio website",
  icons: {
    icon: "/webIcon.png",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

type ThemeProperties = CSSProperties & Record<`--${string}`, string | number>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      style={
        {
          "--color-background": colors.background,
          "--color-surface": colors.surface,
          "--color-surface-muted": colors.surfaceMuted,
          "--color-primary": colors.primary,
          "--color-primary-hover": colors.primaryHover,
          "--color-primary-soft": colors.primarySoft,
          "--color-on-primary": colors.onPrimary,
          "--color-text": colors.text,
          "--color-text-muted": colors.textMuted,
          "--color-border": colors.border,
          "--color-accent": colors.accent,
          "--color-accent-soft": colors.accentSoft,
          "--color-wood": colors.wood,
          "--font-display": font.family.display,
          "--font-body": font.family.body,
          "--font-mono": font.family.mono,
          "--font-size-xs": font.size.xs,
          "--font-size-sm": font.size.sm,
          "--font-size-base": font.size.base,
          "--font-size-lg": font.size.lg,
          "--font-size-xl": font.size.xl,
          "--font-size-2xl": font.size["2xl"],
          "--font-size-3xl": font.size["3xl"],
          "--font-weight-regular": font.weight.regular,
          "--font-weight-medium": font.weight.medium,
          "--font-weight-bold": font.weight.bold,
          "--line-height-tight": font.lineHeight.tight,
          "--line-height-normal": font.lineHeight.normal,
          "--line-height-relaxed": font.lineHeight.relaxed,
          "--radius-small": radius.small,
          "--radius-medium": radius.medium,
          "--radius-large": radius.large,
          "--radius-pill": radius.pill,
          "--radius-circle": radius.circle,
          "--space-0": spacing.none,
          "--space-1": spacing.xxs,
          "--space-2": spacing.xs,
          "--space-3": spacing.sm,
          "--space-4": spacing.md,
          "--space-6": spacing.lg,
          "--space-8": spacing.xl,
          "--space-12": spacing["2xl"],
          "--space-16": spacing["3xl"],
          "--space-24": spacing["4xl"],
        } as ThemeProperties
      }
    >
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Navbar />
          {children}
          <SocialLinks />
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
