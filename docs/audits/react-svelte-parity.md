# React → Svelte parity audit

Date: 2026-10-18. Scope: compare the local React reference, its deployed documentation, and this Svelte starter. This is an initial source and desktop-browser audit, not a claim of full interaction or pixel parity. No application source was changed.

Reference source: `/Users/canceydejean/Documents/Code/UI Libraries/React/Projects/design-system-registry-react-starter`.
Reference deployment: <https://reactdocs.canceydejean.dev/docs>.
Svelte observation: local Vite server at `http://127.0.0.1:5173`.

## Evidence and coverage

- Read both package manifests, route inventories, docs shells, navigation, catalog metadata, styles, installation UI, search implementation, and Storybook/Vitest configuration.
- Opened React `/docs` and `/components`; opened Svelte `/docs`, `/docs/index`, and `/components`. Browser observations corroborate the route, navigation, typography, and gallery differences below. Viewports were different sizes; measurements are not a pixel-diff result.
- Catalog counts are authored `_registry.mdx` / `_registry.svx` entries, including nested React block directories. Counts do not prove equivalent component APIs or behavior.
- REA 6.5.0 doctor found aligned Codex registration but no REA tools were exposed to this session. The CLI selected Node 24.10.0, below its supported 24.11 minimum. No REA application analysis or runtime capture completed; findings below are ordinary source/browser evidence, not REA Evidence records. No REA configuration or runtime installation was changed.
- Svelte documentation MCP tools were not available in this session. No Svelte code was written.

## What already exists

Both have a roughly 16rem sidebar, sticky 4rem header, breadcrumbs, search dialog, GitHub/Storybook links, light/dark and accent controls, footer, authored docs, component/block/utility sections, item preview/code tabs, CLI/manual installation, highlighted source, copy controls, adjacent-page navigation, table of contents, dependency flows, registry JSON, Markdown endpoints, `llms.txt`, and `llms-full.txt`.

This establishes feature presence from source, not complete behavioral equivalence. React uses TanStack Start/Base UI; Svelte uses SvelteKit/Bits UI. Framework-native equivalents should be preserved.

## Prioritized differences

| Priority | Area                         | React reference                                                                                        | Svelte observation / source evidence                                                                                                                      | Acceptance criterion                                                                                                                                           |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | Baseline type safety         | Not executed in the read-only reference                                                                | `vp run check`: 63 errors and 1 warning. Examples include Shiki language registration and Storybook decorator types.                                      | Type check passes before using it to judge parity changes.                                                                                                     |
| P0       | Formatting baseline          | Not executed                                                                                           | `vp check` exits with formatting issues in 26 files.                                                                                                      | Formatting and subsequent lint checks pass; this result does not establish that lint ran successfully.                                                         |
| P1       | Docs entry route             | `/docs` renders Introduction                                                                           | `/docs` renders a link index; Introduction lives at `/docs/index`. `src/routes/(app)/docs/+page.svelte`, `src/lib/navigation.ts`.                         | `/docs` renders Introduction; choose a deliberate compatibility policy for `/docs/index`.                                                                      |
| P1       | Section navigation           | Components/Blocks sidebar links reach section galleries                                                | `src/lib/navigation.ts` selects the first item's URL. At `/components`, the section is collapsed and the breadcrumb is absent.                            | Section links reach indexes; indexes activate/open the correct sidebar section and show breadcrumbs.                                                           |
| P1       | Galleries                    | Searchable component/block previews, grid/list controls, category counts and block category navigation | Svelte `registry-item-list.svelte` renders title/description cards with no preview, search, category filters, or layout switch.                           | Match gallery capabilities and responsive card layout; preserve search/filter state conventions.                                                               |
| P1       | Preview infrastructure       | `component-preview.$name.tsx`, `block-preview.$name.tsx`, lazy iframe gallery previews                 | Svelte embeds item previews directly; no corresponding standalone preview routes in route inventory.                                                      | Provide isolated gallery preview surfaces, loading/error states, and theme synchronization.                                                                    |
| P1       | Page actions                 | Copy Page plus Markdown, ChatGPT, Claude, Perplexity and conditional v0 links                          | Svelte `copy-page-button.svelte` only copies supplied raw source text.                                                                                    | Match useful page actions and canonical Markdown copy output. Treat React-specific v0 support as a separate framework capability decision.                     |
| P1       | Visual foundation            | Geist/Geist Mono; shared registry theme CSS                                                            | Svelte imports Inter and defines shell tokens separately in `src/lib/styles/app.css`. Sidebar branding, row spacing, and prose appearance visibly differ. | Agree on shared font/token specification and compare at equal viewport/theme settings.                                                                         |
| P1       | Authored docs header         | Title, description/subtitle, page actions and pager                                                    | Svelte `[slug]/+page.svelte` renders title/actions but omits metadata description.                                                                        | Render the same header hierarchy, spacing and description role.                                                                                                |
| P1       | Search/discovery metadata    | `src/lib/seo.ts`, route SEO heads, JSON-LD and configured sitemap                                      | Svelte root head only declares favicon; only flows declares a title in inspected Svelte source. No equivalent SEO/sitemap implementation found.           | Page-specific titles/descriptions, canonical and Markdown alternate links, structured data and sitemap. `static/robots.txt` already exists.                    |
| P1       | Catalog                      | 87 authored entries                                                                                    | 66 authored entries; exact-name differences listed below.                                                                                                 | Maintain a semantic mapping with equivalent, missing, intentionally different and framework-specific statuses.                                                 |
| P1       | Generated catalog drift      | Runtime JSON routes derive from catalog                                                                | Svelte generated index declares 66 entries, but `static/r/announcement-bar.json` remains without authored catalog metadata.                               | Rebuild into clean output and verify allowed helper files separately from orphan items.                                                                        |
| P2       | Mobile navigation            | Explicit close-on-navigation logic in `docs-sidebar.tsx`                                               | No corresponding route-close handler found in Svelte shell/nav source.                                                                                    | Verify a phone-width navigation closes the sheet and restores focus/scroll correctly. Runtime mobile test remains open.                                        |
| P2       | Navigation feedback / errors | Navigation progress, pending skeletons, custom global not-found page                                   | No equivalent app-wide progress/custom error route found in Svelte route inventory.                                                                       | Define matching loading, error and 404 experiences using SvelteKit primitives.                                                                                 |
| P2       | Author tooling               | `scripts/new.ts` and tested CLI parsing/scaffold modules                                               | Svelte scripts contain generator and doctor, no scaffolder.                                                                                               | Scaffold metadata/source/preview/story consistently, including nested block categories.                                                                        |
| P2       | Source ownership             | Framework-specific component organization                                                              | 77 matching relative paths between Svelte `src/lib/components/ui` and registry component source; 76 differ in bytes.                                      | Review app-shell adapters versus duplicated component implementations and consolidate where appropriate. Byte differences alone do not prove behavioral drift. |
| P2       | Storybook tooling            | Includes `@storybook/addon-mcp`                                                                        | Svelte has CSF, accessibility, themes, docs, links, Vitest and Chromatic, but no MCP addon in config.                                                     | Decide whether MCP capability is part of the shared development contract.                                                                                      |
| P2       | Package-manager contract     | Manifest specifies Bun                                                                                 | Project instructions say npm, while Svelte `devEngines` requires Bun 1.4.2 and build scripts invoke Bun. npm invocation failed with `EBADDEVENGINES`.     | Select one supported policy, then align manifest, scripts, lockfile and onboarding.                                                                            |

## Catalog mapping backlog

63 exact names are shared. React has 24 names without authored Svelte matches; Svelte has 3 without exact React matches. These are name comparisons, not 24 proven missing capabilities.

Likely component additions to investigate:

- `announcement-bar`, `attachment`, `bubble`, `code-block`, `direction`, `dot-canvas`, `marker`, `message`, `message-scroller`, `questionnaire`, `scroll-fade`, `section`, `shimmer`, `trace`.
- React has separate `hero-01` and `hero-02` blocks; Svelte has a configurable `hero`. Compare composition and props before selecting ports.
- React `toast` and Svelte `sonner` cover notifications through different APIs. Document semantic coverage rather than rename blindly.
- React publishes `mode-toggle`, `theme-toggle`, `use-body-overflow`, `use-close-mobile-menu-on-resize`, `use-copy-to-clipboard`, `use-highlighted-code`, and `use-mobile`. Svelte has some internal theme/mobile/code helpers, but no authored registry entries with those names. Determine which helpers should be installable Svelte utilities.
- Svelte additionally publishes `range-calendar`; preserve it if useful even though React exposes date-range behavior through a different component arrangement.

## Verification results

- `vp install`: completed successfully, no dependency changes.
- `vp dev --host 127.0.0.1 --port 5173`: served the inspected local pages.
- `vp test --project unit --run`: 6 files, 28 tests passed.
- `vp run check`: failed, 63 errors and 1 warning in 64 files.
- `vp check`: failed, formatting issues in 26 files; no auto-fix applied.
- `vp run registry:doctor`: exit 0, warning for Combobox having no files. Its authored docs explicitly describe a composition of Popover, Command and Button, so this is not by itself a broken install.
- Reference tests, Storybook browser tests, production builds, fresh-project CLI installs, all component interactions, equal-viewport screenshot comparisons, mobile, keyboard accessibility and flow behavior were not verified.

## Recommended implementation order

1. Repair baseline type/format issues and agree on package-manager policy.
2. Align `/docs`, section links, sidebar active state, authored header and typography/tokens.
3. Add gallery and standalone preview infrastructure, then block categories and variants.
4. Align page actions, metadata, Markdown discovery and catalog generation hygiene.
5. Port the mapped catalog gaps in small batches, with framework-native APIs and install verification.
6. Validate desktop/mobile, keyboard navigation, themes, preview/code/manual tabs, search and flows against a shared cross-framework checklist.

## Reusable framework parity contract

For Vue and later frameworks, compare: canonical routes; shell geometry and tokens; navigation and responsive behavior; catalog semantic IDs; source/preview/story metadata; gallery behavior; installation/registry JSON; Markdown/LLM discovery; page actions; SEO; search; flows; author tooling; and validation commands. Track every difference as **equivalent**, **missing**, **intentional**, or **unverified**, with a source path or runtime observation. Match public outcomes while preserving native framework implementations.

## Implementation follow-up — October 19, 2026

Implemented the validation repairs, canonical introduction route and compatibility redirect, section index navigation/active state, mobile close-on-navigation, Geist typography, authored page descriptions/metadata, page actions, searchable component/block galleries, category counts, grid/list controls, empty states and isolated theme-aware previews. Catalog additions, source consolidation, a sitemap/full SEO implementation, scaffolding tools, and package-manager migration remain outside this change. The original observations above are retained as the audit baseline.

Final verification for this implementation: Svelte type checking reports zero errors and warnings; Vite+ formatting/lint/type checks pass; the official Svelte autofixer reports no issues or suggestions across 80 changed Svelte files. Desktop browser checks exercised introduction redirects, search and keyboard selection, gallery search/reset, grid/list selection, block categories, isolated preview rendering, page actions and block detail breadcrumbs. Mobile viewport verification remains unconfirmed: the browser viewport override returned without changing the actual 1280px viewport. The mobile close-on-navigation handler is implemented, but a real phone-width browser pass remains advisable. Registry doctor still emits the documented Combobox composition warning and exits successfully.

Final command results: `vp test --run` passed 77 files / 323 tests; `vp run check` reported 0 errors / 0 warnings; `vp check` passed formatting, lint and type analysis; `vp run build` completed successfully. Production build still logs existing mdsvex deprecation and bundle-size/tool profiling notices. No checks were disabled.
