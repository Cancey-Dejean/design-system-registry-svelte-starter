---
name: shadcn-registry
description: Add or adapt installable shadcn-svelte registry items in this SvelteKit template repo.
---

# Shadcn Registry (Svelte)

Use this skill for installable registry items across all public shadcn registry types, previews, usage docs, and registry dependency metadata. Local `AGENTS.md` and `README.md` override this file. See [`sync-registry-metadata`](../sync-registry-metadata/SKILL.md) for the full checklist to run after editing an existing item, and [Registry](../../../registry/docs/registry.svx) for the canonical reference.

## Workflow

1. Inspect the local repo instructions first.
2. Put published item source under `registry/items/**`. Do not put installable item source under `src/lib/components/ui`; that folder is only for the docs app shell (components that wrap a shadcn-svelte primitive are the exception — their real source lives there and `_registry.svx` just points `files[].path` at it).
3. There's no scaffold CLI in this repo. Copy an existing item folder as a starting point (`registry/items/components/button` is a good one) and adjust it.

## Type Map

`registry/items/<section>/<name>/` — `<section>` must be exactly one of `components`, `blocks`, `utilities`, or `files`. Any other folder name is silently invisible to the catalog (see `CATALOG_SECTION_BY_DIR` in `src/lib/registry/catalog.ts`).

| User intent                              | Type                               | Folder                              |
| ---------------------------------------- | ---------------------------------- | ----------------------------------- |
| shadcn-style UI component                | `registry:ui`                      | `registry/items/components/<name>/` |
| non-UI component                         | `registry:component`               | `registry/items/components/<name>/` |
| composed UI pattern                      | `registry:block`                   | `registry/items/blocks/<name>/`     |
| hook, lib, page, theme, font, base, item | matching type                      | `registry/items/utilities/<name>/`  |
| explicit target file / style (CSS)       | `registry:file` / `registry:style` | `registry/items/files/<name>/`      |

All non-`components`/`blocks` types render under the Utilities nav section (`src/lib/registry/sections.ts`); `files/` items still surface there even though they're authored in a separate on-disk folder alongside their CSS.

Use kebab-case folder and file names.

## `_registry.svx`

Each item uses `_registry.svx` (YAML frontmatter, **not** `.mdx`) for metadata and optional public Markdown Usage. Put interactive previews in sibling `_preview.svelte` files and the matching Storybook story in `stories/`. Never list `_registry.svx`, `_preview.svelte`, or `stories/**` in `files`.

Common frontmatter:

```yaml
---
name: example-card
type: registry:ui
title: Example Card
description: A compact card component.
---
```

Dependency fields:

- `dependencies`: npm packages imported by published files (`bits-ui`, `tailwind-variants`, `clsx`, `tailwind-merge`, …).
- `registryDependencies`: other local registry item `name`s this one installs alongside (e.g. `cn`). There's no separate "upstream primitive" field — this repo has no shadcn-svelte-primitive registry to depend on.
- `files`: required for hooks, libs, blocks, pages, and multi-file items. `path` is the **real on-disk source path** — it does not have to (and often doesn't) live inside the item folder:
  - Components wrapping a shadcn-svelte primitive source from `src/lib/components/ui/<name>/...`, with `target: "~/components/<name>/...".`
  - Blocks and utilities authored for this registry (`hero`, `cn`) keep source directly in the item folder (or `src/lib/utils.ts` for `cn`).
  - CSS/standalone files keep everything together under `registry/items/files/<name>/`.
  - Metadata-only style, theme, font, base, and universal items may omit `files` entirely.

Do not add `sourcePath` frontmatter — it isn't part of this repo's schema (`RegistryItemMetadata` in `src/lib/registry/catalog.ts`).

Minimal usage:

````svx
```svelte
<script lang="ts">
  import ExampleCard from "$lib/components/ui/example-card/example-card.svelte";
</script>

<ExampleCard title="Hello" />
```
````

Minimal preview:

```svelte
<script lang="ts">
  import ExampleCard from "./example-card.svelte";
</script>

<ExampleCard title="Preview" description="Docs demo." />
```

Keep previews client-safe: static data, local state, and events are fine; avoid network calls, auth, server-only helpers, env reads, and app-only providers.

## Consumer install

Consumers do not need Bun. Document package-manager agnostic commands:

```sh
npx shadcn-svelte@latest add https://<homepage>/r/example-card.json
pnpm dlx shadcn-svelte@latest add https://<homepage>/r/example-card.json
```

## Adaptation Rules

- Extract only the reusable unit into the item folder.
- Replace app data access with props, sample data, or small exported fixtures.
- Remove dependencies on app routing, auth, database clients, analytics, env vars, and server-only helpers unless the item intentionally installs those integrations.
- Preserve visual behavior unless the user asks for a redesign.
- Keep relative imports inside the item folder relative.
- Publish shared helpers as separate items (referenced via `registryDependencies`) only when that improves install clarity.
- Prefer Svelte 5 runes (`$props`, `$state`, `$derived`, snippets) over legacy Svelte patterns.

## Verification

- Run `bun run registry:doctor` after registry item changes — it lints `_registry.svx` files for bad frontmatter, missing `files[]` paths, and items placed under the wrong section.
- Run `bun run registry:generate` to confirm `registry.generated.json` builds cleanly.
- Run `bun run check` when types change.
- Run `bun run registry:build` (generates JSON, then runs `shadcn-svelte registry build` into `static/r/`) before handoff when docs, routes, registry JSON, catalog loading, or source loading changed.
