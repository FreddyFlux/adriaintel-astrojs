# AdriaIntel web (Astro)

Static marketing and articles site for AdriaIntel, built with **Astro 6**, **Tailwind v4**, **React 19**, and **Sanity CMS** (articles and embedded Studio at `/studio`).

## Commands

From this directory:

| Command        | Action                               |
| -------------- | ------------------------------------ |
| `pnpm install` | Install dependencies                 |
| `pnpm dev`     | Dev server (default `localhost:4321`) |
| `pnpm build`   | Production build to `./dist/`        |
| `pnpm preview` | Preview the production build locally |

## Environment

1. Copy `.env.example` to `.env`.
2. In [sanity.io/manage](https://www.sanity.io/manage), open your project and copy **Project ID** and your **dataset** name (often `production`).
3. Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and the same values on `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` (needed for embedded Studio in the browser).
4. Optional: `SANITY_API_VERSION` (default `2024-01-01`), `SANITY_WEBHOOK_SECRET` if you verify webhooks locally.

On **Vercel**, add the same variables under Project → Settings → Environment Variables for Production (and Preview if needed).

## Sanity Studio and content

- **Local Studio:** `pnpm dev` → [http://localhost:4321/studio](http://localhost:4321/studio) (port may differ).
- Create **Author** documents first, then **Article** documents; **Publish** so the public API returns them.
- Under **API → CORS origins**, add your dev URL and production origin so the Studio can call the API.

## Rebuilds when content changes

The site is **static**: after publishing in Sanity, trigger a new **Vercel deployment** (e.g. [Deploy Hooks](https://vercel.com/docs/deploy-hooks) wired to a Sanity [GROQ-powered webhook](https://www.sanity.io/docs/webhooks) on create/update).

## Static images (`public/images/`)

Place raster assets under `public/images/` so they are served as-is (no import). Use subfolders as follows:

| Folder      | Use                                                                 |
| ----------- | ------------------------------------------------------------------- |
| `hero/`     | Full-width page heroes and Open Graph–style images (e.g. 1200×630). |
| `team/`     | Team member portraits.                                            |
| `articles/` | Optional local fallbacks; article heroes normally come from Sanity. |

## Docs

- [Astro](https://docs.astro.build)
- [Sanity](https://www.sanity.io/docs)
- Project notes: [`docs/astro-react-practices.md`](docs/astro-react-practices.md), [`docs/performance-and-seo.md`](docs/performance-and-seo.md)
