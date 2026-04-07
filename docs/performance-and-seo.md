# Performance and SEO (project standards)

This document defines how we keep the site **fast**, **accessible**, and **easy to index** as content grows.

## Performance

### Images

- Use **`astro:assets`** and the **`<Image />`** component for raster images. Provide **width/height** (or aspect ratio) to reduce layout shift.
- Prefer **modern formats** (WebP/AVIF via Astro where configured) and **appropriate dimensions**—no multi‑megabyte hero images without compression.
- Use `loading="lazy"` for below-the-fold images; **priority** for LCP candidates (e.g. hero) when using `<Image />` with `loading="eager"` or `fetchpriority="high"` as appropriate.

### Fonts

- **Manrope** (headings) and **Inter** (body) are loaded via **Fontsource** in CSS to avoid extra layout shifts; subset to used weights where possible.
- Avoid **render-blocking** third-party font CSS in `<head>` unless required; prefer self-hosted/npm packages already in the bundle.

### JavaScript

- **Minimize client JS:** rely on Astro for HTML; use React islands only where needed (see [astro-react-practices.md](./astro-react-practices.md)).
- Prefer **`client:visible`** or **`client:idle`** over **`client:load`** when interactivity can wait.

### Core Web Vitals (targets)

- **LCP:** optimize hero image, fonts, and avoid blocking scripts.
- **INP:** keep islands small; debounce expensive handlers.
- **CLS:** explicit image dimensions, stable font loading, avoid inserting banners above existing content without reserving space.

## SEO foundation

### Per-page metadata

Each route should set (via the shared layout or wrappers):

- Unique **`<title>`** (brand suffix pattern: `Page Title | AdriaIntel` where useful).
- **Meta description** (≈150–160 characters, unique per page).
- **Canonical URL** via `<link rel="canonical">` using the deployed site origin (see `astro.config` `site`).
- **`lang`** on `<html>` (e.g. `en`).

### Open Graph and Twitter

- `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (default + per-article overrides).
- Twitter Card tags (`twitter:card`, `twitter:title`, etc.) aligned with OG where applicable.

### Structured data (JSON-LD)

- **Organization** + **WebSite** on the home layout (name, url, logo if available).
- **Article** (or **BlogPosting**) on article detail pages: `headline`, `datePublished`, `dateModified`, `author`, `image`.

### Content model

- **Articles** use Astro **content collections** with typed frontmatter (`title`, `description`, `pubDate`, `heroImage`, etc.) so URLs and metadata stay consistent (`/articles/[slug]`).

### Operational

- **`@astrojs/sitemap`** emits `sitemap-index.xml` from built routes (see [`astro.config.mjs`](../astro.config.mjs) `site`).
- **`public/robots.txt`** allows crawlers; update the `Sitemap:` line to match your deployed origin if it differs from the default in that file.
- **RSS** is available at **`/rss.xml`** ([`src/pages/rss.xml.ts`](../src/pages/rss.xml.ts)) for subscribers and aggregators.

## Checklist for new pages

1. Set title, description, canonical, and OG/Twitter fields.
2. Use one H1 per page; logical heading order.
3. Images use `<Image />` or explicit dimensions.
4. Interactive pieces are islands with the lightest suitable `client:*` directive.
