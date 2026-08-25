# Farmhouse Pink Style Guide

## Direction

The portfolio uses a warm farmhouse-core visual language with dusty pink as its lead
color. It should feel personal, collected, and welcoming: cream paper, painted wood,
soft florals, inherited type, and practical layouts rather than polished luxury or
neon nostalgia.

Use pink for identity and action. Sage and wood tones support it in smaller amounts,
while warm neutrals keep content readable.

## Principles

- **Warm, not stark:** use cream backgrounds and off-white surfaces instead of pure
  white page fields.
- **Crafted, not cluttered:** pair fine borders and gently rounded corners with
  generous empty space.
- **Traditional, not formal:** use the handwritten Amatic SC display face for headings
  and a quiet sans serif for longer reading.
- **Pink leads:** reserve sage and wood for tags, quotes, code, and small supporting
  details.
- **Content stays practical:** decoration must not compete with navigation, writing, or
  project details.

## Color

The source of truth is [`src/lib/colors.ts`](../src/lib/colors.ts). The root layout maps
these values to matching `--color-*` custom properties.

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#fff8f3` | Warm page canvas |
| `surface` | `#fffdf9` | Cards, navigation, and reading surfaces |
| `surfaceMuted` | `#f4ebe4` | Quiet fills and inline code |
| `primary` | `#a94065` | Links, selected states, and primary actions |
| `primaryHover` | `#87334f` | Hover states and strong pink headings |
| `primarySoft` | `#f9dce5` | Low-opacity decorative grid and selection |
| `onPrimary` | `#ffffff` | Text placed on primary pink |
| `text` | `#3e302d` | Default copy |
| `textMuted` | `#6f5953` | Supporting copy and metadata |
| `border` | `#d8c5ba` | Dividers and card outlines |
| `accent` | `#69745a` | Sage tags and blockquotes |
| `accentSoft` | `#e5e9de` | Sage-tinted fills |
| `wood` | `#8a5942` | Code and restrained craft details |

Do not introduce one-off pinks in components. Choose the closest semantic token first;
change the shared palette only when the new role is reusable. `primary` with
`onPrimary`, and the text colors on the warm backgrounds, meet normal-text contrast
needs.

## Typography

The source of truth is [`src/lib/font.ts`](../src/lib/font.ts). Next.js loads and
optimizes Amatic SC for the display role; body and mono text use local system fonts.

| Role | Token | Guidance |
| --- | --- | --- |
| Display | `font.family.display` | Headings, wordmarks, and short feature labels |
| Body | `font.family.body` | Navigation, body copy, metadata, and controls |
| Mono | `font.family.mono` | Code and technical values only |
| Small | `font.size.xs` / `sm` | Tags and secondary metadata |
| Reading | `font.size.base` / `lg` | Default copy and emphasized introductions |
| Heading | `font.size.xl` / `2xl` / `3xl` | Clear section-to-page hierarchy |

Use `tight` line height for headings, `normal` for interface and body copy, and
`relaxed` only for long editorial passages. Keep body copy at `base` or larger. Avoid
all-caps text except for short tags with added letter spacing.

## Spacing

The source of truth is [`src/lib/spacing.ts`](../src/lib/spacing.ts). The scale follows
a 4px base and is exposed as `--space-*` custom properties.

| Token | Value | Typical use |
| --- | --- | --- |
| `none` | `0` | Reset only |
| `xxs` | `0.25rem` | Focus offsets and hairline details |
| `xs` | `0.5rem` | Inline gaps and compact controls |
| `sm` | `0.75rem` | Tags and navigation padding |
| `md` | `1rem` | Default content gap |
| `lg` | `1.5rem` | Card padding on small screens |
| `xl` | `2rem` | Card padding and section gaps |
| `2xl` | `3rem` | Page breathing room |
| `3xl` | `4rem` | Large section separation |
| `4xl` | `6rem` | Reserved editorial spacing |

Prefer adjacent steps on the scale. A component should usually use no more than three
spacing values so its rhythm stays legible.

## Border Radius

The source of truth is [`src/lib/radius.ts`](../src/lib/radius.ts). The root layout
exposes the scale as `--radius-*` custom properties.

| Token | Value | Typical use |
| --- | --- | --- |
| `small` | `0.25rem` | Compact controls and subtle rounding |
| `medium` | `0.5rem` | Cards and content containers |
| `large` | `1rem` | Prominent panels and media frames |
| `pill` | `999px` | Tags and selected navigation states |
| `circle` | `50%` | Square avatars, discs, and icon buttons |

Use the same radius on every corner. Do not use asymmetric or individually rounded
corners. Choose the closest radius token instead of copying a raw value or reusing a
spacing token.

## Components And Layout

- Keep reading content within the existing `1000px` page container.
- Let the page canvas show through primary content containers and use spacing instead
  of borders or fills to separate them.
- Use pill shapes for tags and selected navigation states.
- Use the dusty-rose grid only as a low-contrast page texture. Do not repeat it inside
  cards.
- Keep interactive text pink and always retain a visible focus outline.
- On narrow screens, stack navigation and reduce card padding before reducing type.

## Using The Utilities

Import values through the configured alias when styling a React element or mapping new
CSS custom properties:

```tsx
import { colors } from "@lib/colors";
import { font } from "@lib/font";
import { radius } from "@lib/radius";
import { spacing } from "@lib/spacing";

const calloutStyle = {
  background: colors.primarySoft,
  color: colors.text,
  fontFamily: font.family.body,
  padding: spacing.lg,
  borderRadius: radius.medium,
};
```

For global CSS, use the variables already mapped in `src/app/layout.tsx` instead of
copying raw values.
