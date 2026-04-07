# Astro + React practices (this project)

This site uses **Astro 6** with the **React** integration (`@astrojs/react`). The default is **no client JavaScript**: pages ship as static HTML unless you opt in with a **client directive** on a React (or other framework) component.

## Islands model

- **`.astro` components** render on the server and emit HTML. Use them for layout, navigation markup (when static), SEO-critical content, and anything that does not need browser state.
- **React components** (`.tsx`) should be used as **islands**: small, focused UI that needs interactivity (state, effects, form validation, animations that depend on client APIs).

### Client directives

| Directive | When to use |
|-----------|----------------|
| `client:load` | Needed immediately after paint (e.g. above-the-fold widget that must be interactive right away). **Heaviest** default for time-to-interactive. |
| `client:idle` | Can wait until the main thread is idle. Good for non-critical enhancements. |
| `client:visible` | Hydrate when the component enters the viewport. Prefer for below-the-fold widgets (e.g. contact form, carousels). |
| `client:only="react"` | No server render; use only when SSR is impossible or harmful (e.g. browser-only APIs without guards). Prefer sparingly. |

**Guideline:** Prefer the **weakest** directive that still meets UX. For example, a mobile menu can use `client:visible` if it is inside the header and only needed after scroll, or `client:idle` if it is acceptable to hydrate shortly after load.

## Component boundaries

- **Layout and copy** live in Astro so crawlers and users without JS see full content.
- **React** handles: controlled forms, validation, complex keyboard/focus behavior, and third-party widgets that assume a browser environment.
- Pass data **from Astro into React** via props (`<MyForm client:visible recipient="sales" />`). Avoid fetching the same content on the client that Astro already resolved unless you have a real-time or user-specific need.

## Hydration cost

- Each island is a separate React **hydration** boundary. Many small islands can still add up; **fewer, smaller** islands are better than one giant hydrated app shell.
- Do not wrap an entire page in `client:load` React. Split by feature (nav drawer, form, filter bar).

## SSR, SSG, and prerendering

- **Prerendered** routes (default in static builds) emit HTML at build time. React islands still hydrate on the client; the server-rendered HTML for those islands comes from React SSR during the build unless `client:only` is used.
- If you later add **server endpoints** or `output: 'server'`, coordinate data loading with Astro’s patterns (e.g. `getStaticPaths`, server components) and keep client bundles small.

## Shared state between islands

- **Prefer Astro props and URL state** over global client state.
- If multiple islands must share state, consider **Nano Stores** (`@nanostores/react`) or similar—only when necessary; document any cross-island stores in this file.

## Tailwind + React

- Use **`className`** with Tailwind utilities; keep utility order stable (optional: Prettier plugin).
- **shadcn/ui** primitives live under `src/components/ui/` and follow the same patterns as [shadcn documentation](https://ui.shadcn.com). Prefer composing existing `Button`, etc., over one-off styled elements when behavior matches.

## Icons

- Page shells load **Material Symbols Outlined** from Google Fonts in [`Layout.astro`](../src/layouts/Layout.astro) with **`font-display: optional`** so the icon font does not block first paint (LCP). Mockup markup can use `<span class="material-symbols-outlined">` consistently.
- **Lucide** (`lucide-react`) remains available for React-only UI where outlined icons are not required. Avoid mixing both in the same control unless there is a clear reason.

## References

- [Astro React integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)
