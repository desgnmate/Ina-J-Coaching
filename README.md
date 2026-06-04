# Ina J Coaching

A modern, conversion-focused coaching website for **Ina J Photography** — built as a warm, editorial, premium home for Ina's pet-photographer business and marketing coaching.

Connected to, but distinct from, the existing Ina J Photography brand: same emotional storytelling, same warm autumn palette, same attention to craft — translated into a coaching experience for other photographers.

---

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **Framer Motion** (entrance, scroll, parallax, and text animations)
- **Lenis** (smooth scroll on desktop + tablet)
- **TypeScript**
- **next/font** (Fraunces display + Inter body + Caveat accent)

All pages are statically generated for speed, SEO, and cheap hosting.

---

## Pages

| Route         | Purpose                                                         |
| ------------- | --------------------------------------------------------------- |
| `/`           | Homepage — 10 sections, full conversion arch from hero to CTA.  |
| `/about`      | Ina's story, timeline, values, and credentials.                 |
| `/coaching`   | The signature program: who, what's inside, process, FAQs, apply. |
| `/resources`  | Checklist, podcast, community, live events, journal.            |
| `/testimonials` | All coaching client stories with stats.                      |
| `/contact`    | Form + direct contact + discovery call.                         |

Plus:
- `/opengraph-image` — dynamic 1200×630 PNG for social sharing.
- `/icon.svg` and `/apple-icon.svg` — branded favicons.

---

## Project structure

```
ina-j-coaching/
├── app/
│   ├── about/page.tsx
│   ├── coaching/page.tsx
│   ├── contact/page.tsx
│   ├── resources/page.tsx
│   ├── testimonials/page.tsx
│   ├── apple-icon.svg
│   ├── icon.svg
│   ├── opengraph-image.tsx
│   ├── globals.css        # Tailwind v4 @theme tokens, base, components
│   ├── layout.tsx         # Root layout, fonts, header/footer
│   └── page.tsx           # Home (composes all home/* sections)
├── components/
│   ├── home/              # Hero, Problem, Pillars, Offer, AboutTeaser,
│   │                      # WhoFor, Outcomes, Testimonials, LeadMagnet,
│   │                      # FinalCta
│   ├── layout/            # Header (client) + Footer
│   └── shared/            # Button, SectionHeading, Reveal (extended),
│                          # SplitText, SplitChars, Parallax, ImageReveal,
│                          # StickyScroll, CountUp, Marquee, LineDraw,
│                          # OrganicShape, SmoothScroll, ScrollProgress,
│                          # ContactForm, EmailCapture
├── lib/
│   ├── content.ts         # All copy, navigation, testimonials
│   └── images.ts          # Image registry (Unsplash URLs)
├── public/
├── next.config.ts         # Remote-image allowlist (Unsplash + photobiz)
├── postcss.config.mjs
└── package.json
```

---

## Design system

All tokens live in `app/globals.css` under `@theme`. To rebrand, edit this file.

| Token | Value | Use |
| --- | --- | --- |
| `--color-cream` | `#FAF5EC` | Default page background |
| `--color-cream-deep` | `#F1E8D8` | Alternating panel |
| `--color-peach-soft` | `#FCE8D8` | Soft warm panel |
| `--color-taupe-light` | `#DDCFB6` | Muted background |
| `--color-terracotta` | `#CA5F3C` | Primary accent / CTA |
| `--color-terracotta-soft` | `#E8B59A` | Hover accents |
| `--color-gold` | `#C9A76A` | Hairlines / decorative |
| `--color-ink` | `#2B1F17` | Headings + body |
| `--color-ink-soft` | `#5A463A` | Secondary body |
| `--font-display` | Fraunces | All headings |
| `--font-sans` | Inter | Body + UI |
| `--font-script` | Caveat | Pull-quote marks |

Utility classes used throughout the design:
- `.container-editorial` — max-width 1280 + responsive side padding.
- `.eyebrow` — uppercase terracotta label.
- `.display-1` / `.display-2` / `.display-3` — fluid type scale.
- `.lead` / `.body-lg` / `.body` — body text variants.
- `.btn-primary` / `.btn-secondary` / `.btn-ghost` — button system.
- `.panel-cream` / `.panel-peach` / `.panel-taupe` — section backgrounds.
- `.text-balance` / `.text-pretty` — typography helpers.
- `.link-underline` — animated terracotta underline on link hover.

### Section background patterns

Add tactile depth to any section with a single class. All patterns are 2–6% opacity, brand-tinted, and live above the section background but below content. Pair with a `relative` parent.

| Class | Look | Used on |
| --- | --- | --- |
| `.bg-grain` | Fine paper grain, terracotta-tinted | Testimonials, panels |
| `.bg-noise-cream` | Soft cream noise, slightly warmer | Problem, Resources, Contact |
| `.bg-dots` | Polka-grid dots, terracotta | Pillars |
| `.bg-lines` | Diagonal hairlines, gold | Outcomes |
| `.bg-paw` | Tiled paw prints (very subtle) | Hero, AboutTeaser, About hero |
| `.bg-blob` | Hand-drawn organic blob, terracotta | Hero, WhoFor, Contact |
| `.bg-grid` | Architectural grid, gold | Coaching inclusions |
| `.bg-watercolor` | Watercolour wash, peach | Resources CTA |

To make sure patterns sit behind text, give the section `relative` and use `.has-pattern` to z-stack the pseudo-element below content. Patterns are `aria-hidden` and `pointer-events-none`.

---

## Motion system

Built on **Framer Motion** + **Lenis**. Every component respects `prefers-reduced-motion: reduce` and falls back to instant show/hide when set.

| Component | Use |
| --- | --- |
| `SmoothScroll` | Mounts in `app/layout.tsx`. Lenis smooth scroll on desktop + tablet, native on touch devices, off when reduce-motion is set. Handles in-page anchor clicks with -80px header offset. |
| `ScrollProgress` | Top-edge progress bar; `useScroll` + spring. |
| `Reveal` | Entrance reveal primitive. Props: `from` (`up|down|left|right|scale|blur|none`), `delay`, `y`, `x`, `duration`, `amount`, `as`, `once`. |
| `SplitText` | Word/line mask reveal. Props: `mode` (`word|line`), `delay`, `stagger`, `trigger`. |
| `SplitChars` | Letter-by-letter stagger for hero headlines. |
| `Parallax` | Scroll-progress Y/X translation. Props: `speed` (-1 to 1), `axis` (`y|x`). |
| `ImageReveal` | Clip-path wipe on scroll for `<Image>` blocks. |
| `StickyScroll` | Pinned-scroll container. Used on `/about` for the timeline (left column pinned, right column scrolls). |
| `CountUp` | Animated number ticker with `useInView` trigger. Used on `/testimonials` for the 4 stats. |
| `Marquee` | Infinite horizontal scroll. Used as a divider on `/coaching` between hero stats and pillars. |
| `LineDraw` | ScaleX line that draws on scroll, brand accent. |
| `OrganicShape` | Decorative SVG: `blob-a` / `blob-b` / `blob-c` / `paw` / `spark`. |

### Lenis setup

Lenis is mounted once in the root layout via `SmoothScroll`. It is automatically disabled on:
- Touch devices (`'ontouchstart' in window`).
- Users with `prefers-reduced-motion: reduce`.
- When Lenis is `undefined` (browser doesn't support smooth scroll).

For in-page anchors (e.g. `/about#timeline`), `SmoothScroll` intercepts click, prevents default, and calls `lenis.scrollTo(target, { offset: -80 })` so the sticky header doesn't cover the destination.

---

## Editing content

Almost every line of copy is in **`lib/content.ts`**. To change a headline, testimonial, nav item, or footer link, edit that one file and the change flows through every page.

To swap images, edit **`lib/images.ts`** (currently uses curated Unsplash URLs that match the brand: warm, autumn, dogs, photographers, BTS).

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start        # http://localhost:3000
```

The project is configured to be **100% static** — every page (except the dynamic OG image) is prerendered, so it can be deployed to Vercel, Netlify, Cloudflare Pages, or any static host.

---

## Deploying to Vercel (recommended)

1. Push this folder to a new GitHub repo.
2. Import the repo in [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy**.

That's it. No environment variables required for the current build.

To wire up the contact form and the email-capture form, replace the stub `onSubmit` handlers in:
- `components/shared/ContactForm.tsx`
- `components/shared/EmailCapture.tsx`
- `components/home/LeadMagnet.tsx`

with a real endpoint (Formspree, Resend, ConvertKit, Mailchimp, or a Next.js server action that calls your API of choice).

---

## Booking link

The header + footer + final CTAs all link to the placeholder `#book`. Replace this with a real Calendly / Acuity / Cal.com URL by editing `lib/content.ts`:

```ts
export const site = {
  ...
  bookingHref: "https://calendly.com/ina-j/strategy-call",
  ...
};
```

It propagates through every CTA on the site.

---

## Imagery

The build uses **curated Unsplash stock photos** (warm, autumn-toned, dogs, photographers, behind-the-scenes, planning scenes) to match the brand direction. These are loaded via `next/image` from the Unsplash CDN.

To swap to real photography:
1. Drop the real JPGs into `public/images/`.
2. Update `lib/images.ts` to point to the local paths, e.g. `"/images/hero.jpg"`.

If you'd like AI-generated custom imagery (the brief mentioned this), we can add a staging `.pen` design file and feed the exported images into `public/images/`.

---

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`).
- Skip-to-content link.
- WCAG-AA contrast for all body and CTA text (ink on cream = 13.5:1, terracotta on cream ≈ 4.8:1).
- `prefers-reduced-motion` respected in every Framer Motion + Lenis animation.
- Keyboard-navigable nav, focus rings on every interactive element.
- All decorative SVG patterns and shapes are `aria-hidden` and `pointer-events-none`.
- `[id] { scroll-margin-top: 6rem }` so in-page jumps clear the sticky header.

---

## Performance

- All 6 pages prerendered as static HTML.
- Fonts self-hosted via `next/font` — no third-party requests.
- `next/image` with responsive `sizes` for every photo.
- Pattern backgrounds are pure CSS — no extra image requests.
- Lenis + ScrollProgress add ~5KB gzipped to the client bundle (one shared provider).

---

## License

Site content & copy: © Ina J Photography 2026. All rights reserved.
Code: private — do not redistribute without permission.
