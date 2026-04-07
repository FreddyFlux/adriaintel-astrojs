# AdriaIntel web (Astro)

Static marketing and articles site for AdriaIntel, built with **Astro 6**, **Tailwind v4**, **React 19**, and **Content Collections**.

## Commands

From this directory:

| Command        | Action                                      |
| -------------- | ------------------------------------------- |
| `pnpm install` | Install dependencies                        |
| `pnpm dev`     | Dev server at `localhost:4321`             |
| `pnpm build`   | Production build to `./dist/`               |
| `pnpm preview` | Preview the production build locally        |

## Static images (`public/images/`)

Place raster assets under `public/images/` so they are served as-is (no import). Use subfolders as follows:

| Folder      | Use                                                                 |
| ----------- | ------------------------------------------------------------------- |
| `hero/`     | Full-width page heroes and Open Graph–style images (e.g. 1200×630). |
| `team/`     | Team member portraits.                                            |
| `articles/` | Article hero images until a CMS (e.g. Sanity) supplies remote URLs. |

A `.gitkeep` in each folder keeps empty directories in Git until real files are added.

## Docs

- [Astro](https://docs.astro.build)
- Project notes: [`docs/astro-react-practices.md`](docs/astro-react-practices.md), [`docs/performance-and-seo.md`](docs/performance-and-seo.md)
