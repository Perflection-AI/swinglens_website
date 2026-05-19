# SneakySwing Website Design System

Directly mirrors the app's Figma design tokens. 7 colors total — no intermediate shades.

---

## Color Palette

| Token | HEX | Tailwind Class | App Source | Usage |
|-------|-----|----------------|------------|-------|
| `paper` | `#F8FAF5` | `paper` | `background.white` (tinted) | Page backgrounds |
| `ink` | `#4E4E4E` | `ink` | `gray700` / `content.primary` | Primary text |
| `subtle` | `#828282` | `subtle` | `gray500` / `content.secondary` | Secondary text, labels |
| `gold` | `#A88D37` | `gold` | `yellow700` / `brand.secondary` | Coach cards, stars, accents |
| `green` | `#719241` | `green` | `green700` / `brand.primary` | Buttons, brand color, icons |
| `green-light` | `#E8F3D8` | `green-light` | `green300` / `background.positive` | Light backgrounds, badges, borders |
| `dark` | `#111A05` | `green-dark` | — (website-only) | Dark sections (SwingRecord) |

### Tailwind Config

```js
colors: {
  paper:  '#F8FAF5',
  ink:    '#4E4E4E',
  subtle: '#828282',
  gold:   '#A88D37',
  green: {
    DEFAULT: '#719241',
    light:   '#E8F3D8',
    dark:    '#111A05',
  },
}
```

### Usage Rules

- **Never** add intermediate shades (e.g., `green-400`, `green-600`). Use opacity modifiers instead: `green/20`, `green-light/60`
- **No custom hex values** in component files — use only the tokens above
- Hover states on green buttons: rely on `hover:-translate-y-0.5` + shadow changes; no color shift needed

---

## Typography

- **Font**: DM Sans (matches app)
- **Display / headings**: DM Sans Bold, `font-display font-bold`
- **Body**: DM Sans Regular
- **Labels / badges**: DM Sans Bold, `uppercase tracking-widest text-xs`

---

## Buttons

All buttons use `rounded-full` (pill shape, matching app's `border-radius: 9999px`).

| Variant | Classes |
|---------|---------|
| Primary | `bg-green text-white rounded-full` |
| Secondary | `bg-white text-green border border-green rounded-full` |
| Ghost/outline | `border border-ink/15 text-ink rounded-full hover:bg-paper` |

---

## Section Backgrounds

| Section | Background |
|---------|------------|
| Light sections (Features, Coaches, Testimonials, etc.) | `bg-paper` |
| White cards | `bg-white` |
| Dark section (SwingRecord) | `bg-green-dark` |

---

## Spacing

4px grid. All spacing must be a multiple of 4px. Section vertical padding: `py-24`.
