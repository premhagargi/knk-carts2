# VCR Design System

This document formalizes the existing visual language of the VCR site. **Nothing here changes how the public site currently looks** — it documents the tokens and rules that already exist in `src/app/globals.css` and `tailwind.config.ts`, and adds a small set of additional tokens for the admin panel.

## 1. Tokens (HSL CSS vars, defined in `globals.css`)

### Public site (do not change values)

| Token                  | Value           | Where used                                                   |
| ---------------------- | --------------- | ------------------------------------------------------------ |
| `--background`         | `0 0% 0%`       | Page background (pure black)                                 |
| `--foreground`         | `0 0% 100%`     | Default text                                                 |
| `--card`               | `0 0% 0%`       | Card surface (same as background by design)                  |
| `--popover`            | `0 0% 5%`       | Popovers, dropdown surfaces                                  |
| `--primary`            | `0 84% 56%`     | Brand red `#FC2121` — CTAs, accents, marquee, link hovers    |
| `--secondary`/`--accent` | `212 100% 54%` | Brand blue `#128EFF` — engineering/blueprint accent          |
| `--muted`              | `0 0% 15%`      | Muted surface                                                |
| `--muted-foreground`   | `0 0% 65%`      | Secondary text                                               |
| `--destructive`        | `0 84% 60%`     | Destructive actions                                          |
| `--border`             | `0 0% 20%`      | Borders                                                      |
| `--input`              | `0 0% 20%`      | Form fields                                                  |
| `--ring`               | `212 100% 54%`  | Focus ring (blue)                                            |
| `--radius`             | `0rem`          | **Zero-radius is global and enforced** (`* { border-radius: 0 !important }`) |

### Admin panel (additional, scoped to `/admin/**`)

| Token                       | Value        | Use                                       |
| --------------------------- | ------------ | ----------------------------------------- |
| `--admin-bg`                | `0 0% 4%`    | Admin page background (slightly off-black so the admin reads distinct from marketing) |
| `--admin-surface`           | `0 0% 7%`    | Cards, panels                             |
| `--admin-surface-2`         | `0 0% 10%`   | Raised surfaces (active row, hover)       |
| `--admin-border`            | `0 0% 16%`   | Admin-internal borders                    |
| `--admin-muted-foreground`  | `0 0% 60%`   | Secondary admin text                      |

Tailwind exposes these as `bg-admin-bg`, `bg-admin-surface`, `border-admin-border`, etc.

## 2. Typography

- **Family:** Inter (Google Fonts, loaded in `src/app/layout.tsx`). Tailwind aliases: `font-body`, `font-headline`, both Inter.
- **Weights in use:** 400, 500, 600, 700, 900 (`font-black` for display headlines).
- **Letter spacing:** `tracking-tightest = -0.04em` for display headlines, `tracking-tighter = -0.02em` for sub-display, `tracking-widest` / `tracking-[0.3em–0.5em]` for the small caps eyebrow labels that appear throughout (e.g. `DESIGN PORTFOLIO`).
- **Italic** is used selectively on accented headline words (`text-primary italic`).
- **Microcopy convention:** small labels (`text-[10px] / text-xs`), uppercase, wide tracking, bold. See `Navbar`, eyebrow labels in every section.

## 3. Zero-radius rule

Every element renders with `border-radius: 0`. This is enforced both via `--radius: 0rem`, Tailwind's `borderRadius` map (all keys → `0`), and a hard CSS override in `@layer base`. **Never reintroduce rounded corners** — including in admin.

## 4. Buttons & links

The site uses raw HTML buttons (not the `<Button>` shadcn primitive) for marketing CTAs. Established variants:

- **Solid red CTA**: `bg-primary text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all`
- **Outline CTA**: `border border-white/20 text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all`
- **Nav link**: `text-[10px] uppercase tracking-widest font-semibold hover:text-primary transition-colors`

For the **admin panel**, prefer the existing shadcn `<Button>` primitive — variants `default`, `outline`, `ghost`, `destructive` are sufficient; do not invent new ones.

## 5. Layout primitives

- **Container**: `container mx-auto px-6` (marketing). Vertical rhythm uses `py-32` for full sections, `py-48` for the blueprint section, `mb-32 / gap-32` at the largest scale.
- **Grid**: 12-col implied via `grid grid-cols-1 lg:grid-cols-2` or `lg:grid-cols-3` per section. Section dividers via `border-t border-white/5` or `border-y border-white/5`.
- **Admin**: uses `src/components/ui/sidebar.tsx` (shadcn) for the shell. Tables via `src/components/ui/table.tsx`. Forms via `react-hook-form` + `src/components/ui/form.tsx`.

## 6. Motion & scroll

- **Smooth scroll**: `Lenis` (see `src/components/lenis-provider.tsx`). Wraps the marketing layout only.
- **Background color shift on scroll**: `ScrollBackground` interpolates body color across scroll progress. Marketing only — admin should not mount it.
- **Animations**: `framer-motion` `initial / whileInView / animate` with `ease: [0.16, 1, 0.3, 1]` and 1–1.5s durations for hero-scale reveals; 0.5–1s for in-view reveals.

## 7. Imagery

- `next/image` everywhere. Marketing imagery is grayscaled by default and colorizes on hover (`grayscale hover:grayscale-0 transition-all duration-1000`). Honor this treatment in any new marketing imagery.
- Admin imagery is plain (no grayscale treatment).

## 8. Section eyebrow pattern

Every marketing section opens with the same eyebrow → headline → body block:

```tsx
<h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-4">
  SECTION LABEL
</h2>
<p className="text-4xl md:text-6xl font-black uppercase tracking-tightest">
  HEADLINE.
</p>
```

Reuse this pattern on every new marketing route.

## 9. Custom utility classes (in `globals.css`)

- `.grid-overlay` — faint blue grid backdrop (hero).
- `.blueprint-grid` — wider white grid backdrop (blueprint section).
- `.no-scrollbar` — used on horizontal product carousel.
- Custom scrollbar styling targets `::-webkit-scrollbar` with primary red on hover.

These are part of the system; treat them as named tokens.
