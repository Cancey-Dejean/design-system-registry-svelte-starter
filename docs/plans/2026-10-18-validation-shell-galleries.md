# Validation, docs shell and galleries implementation plan

**Goal:** Restore passing validation, then match the selected React documentation shell and gallery behavior using Svelte-native components.

**Architecture:** Keep authored registry metadata as the catalog. Share authored doc rendering between the canonical introduction and slug pages. Add isolated preview routes and a reusable gallery with filtering and layout controls. Preserve existing item detail and utility pages.

**Stack:** Svelte 5, SvelteKit, Tailwind 4, Storybook CSF, Vite+.

1. Reproduce type and formatter failures; inspect installed Storybook decorator contracts and Shiki language types; repair the shared causes without suppressing checks. Run type checking, formatting/lint, unit tests, browser story tests and production build as appropriate.
2. Normalize introduction URLs to `/docs`, sidebar index destinations and active state; align header/prose/sidebar presentation with React; retain `/docs/index` compatibility. Add navigation regression coverage.
3. Add standalone component/block previews and a shared searchable grid/list gallery with lazy previews, category filtering, empty states and theme synchronization. Test filtering/category behavior and browser flows.
4. Update changelog and audit status; verify final checks and desktop/mobile presentation.

The user selected the React reference design and authorized this sequence. New catalog ports, scaffolding tools, broad component API migrations and package-manager migration are outside this implementation.
