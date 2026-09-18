---
name: sync-registry-metadata
description: >-
  Keep registry item _registry.svx and _preview.svelte in sync when published
  source changes. Use when adding, removing, renaming, or refactoring files
  under registry/items/**, when registry:generate fails or a file is missing
  from the catalog, or when the user asks to update registry metadata or
  previews.
---

# Sync Registry Metadata

After changing any installable source under `registry/items/**`, update the item's authoring files so the catalog, docs page, and install JSON stay accurate.

Read [`skills/shadcn-svelte/SKILL.md`](../shadcn-svelte/SKILL.md) for the underlying shadcn-svelte conventions (imports, composition, styling). See [Registry](../../../registry/docs/registry.svx) for the full authoring reference. Run this skill **before handoff** on every registry item edit.

## When To Run

Run after changes that touch:

- Published source files (`.svelte`, `.ts`, `.css`, etc.)
- Public API surface (props, variants, exports)
- Install layout (new subfolders, renamed files, split modules)
- Package dependencies

Skip when edits are limited to private authoring-only files with no consumer impact (for example, a story file — `registry:generate` never reads `stories/`).

## Where the source actually lives

`files[].path` in `_registry.svx` points at the real source file — it does **not** have to live inside the item folder:

- **Components that wrap a shadcn-svelte primitive** (`button`, `badge`, `card`, `accordion`, `tabs`) point at `src/lib/components/ui/<name>/...` — the same file the `shadcn-svelte` CLI would generate.
- **Published CSS and other standalone files** (`styles`) point at `registry/items/files/<name>/...`.
- **Blocks and utilities authored for this registry** (`hero`, `announcement-bar`) keep their source directly in the item folder; `cn` points at `src/lib/utils.ts`.

## Workflow

1. **Find the item root** — the folder containing `_registry.svx` (for example `registry/items/components/badge/`).
2. **Inventory on-disk source** — list every file the item actually installs, wherever it lives (item folder or `src/lib/**`).
3. **Read `_registry.svx`** — compare its YAML frontmatter (`files`, `dependencies`, `registryDependencies`, `title`, `description`) and Markdown usage example against reality.
4. **Read `_preview.svelte`** if one exists — confirm it still renders the item's primary experience.
5. **Apply updates** — follow the checklists below.
6. **Verify** — run `vp check --fix` on touched files, then `bun run registry:generate` (fails loudly on a malformed `_registry.svx` or a `files[].path` that doesn't exist).
7. **Changelog** — if the change is user-facing, run the `update-changelog` skill.

## `_registry.svx` Frontmatter Checklist

- [ ] **name** — matches the item folder name
- [ ] **type** — one of the `RegistryItemType` values in `src/lib/registry/item-types.ts` (`registry:ui`, `registry:component`, `registry:block`, `registry:lib`, `registry:style`, `registry:file`, …), and maps to the right section in `src/lib/registry/sections.ts`
- [ ] **files** — every publishable source file is listed with `path` (real on-disk path, not necessarily under the item folder), `type`, and `target` (where it lands in a consumer's project); deleted files are removed, renames are updated
- [ ] **dependencies** — npm packages imported by published files are listed (`bits-ui`, `tailwind-variants`, `clsx`, `tailwind-merge`, …)
- [ ] **registryDependencies** — other item `name`s this one installs alongside, if any
- [ ] **description** — still accurate after API or behavior changes
- [ ] **Usage Markdown body** (below the frontmatter) — import paths, component names, and prop examples match the current API

## `_preview.svelte` Checklist (when the item has one)

- [ ] Renders as a plain Svelte component with a default export (no named `Preview` export required — `loadRegistryItemPreview` just imports `.default`)
- [ ] Imports from the same paths a consumer would use (`$lib/components/ui/<name>`, not a relative path into the item folder, unless the item's own source lives in the item folder)
- [ ] Showcases the default or most representative state after the change
- [ ] Reflects new variants, props, or behavior consumers will see on the docs page's "Preview" tab
- [ ] A `_preview.svelte` is optional — `item-doc-page.svelte` falls back to "No preview available." when one is missing, so don't force one onto a CSS-only item like `styles`

## Change → Update Map

| Source change                          | `_registry.svx`                     | `_preview.svelte`                            |
| --------------------------------------- | ------------------------------------ | --------------------------------------------- |
| Added/removed/renamed publishable file  | Update `files`                       | Update imports if the preview used that file   |
| New npm import in published source      | Add to `dependencies`                | —                                              |
| New local registry item dependency      | Add to `registryDependencies`        | —                                              |
| New variant, size, or prop              | Update the usage example             | Show the new option when it's the best demo    |
| Renamed export or prop                  | Update the usage example             | Update props passed to the preview             |

## Verification Signals

Treat these as action items for this skill:

- `bun run registry:generate` throws or a `files[].path` 404s — the frontmatter references a file that moved or was deleted
- The item is missing from `/components`, `/blocks`, or `/utilities` — its folder likely isn't under a valid section (`registry/items/<components|blocks|utilities>/<name>/`), so `parseItemPath` in `src/lib/registry/catalog.ts` silently drops it
- `vp check` flags an unused import or a type mismatch in `_registry.svx`'s usage snippet's code fence — fix the snippet to match the current API

## Example

Adding a new file to an existing item:

```yaml
# _registry.svx frontmatter — add the new file
files:
  - path: src/lib/components/ui/badge/badge.svelte
    type: registry:ui
    target: components/ui/badge/badge.svelte
  - path: src/lib/components/ui/badge/index.ts
    type: registry:ui
    target: components/ui/badge/index.ts
```

## After Editing

```sh
vp check --fix registry/items/<path>/**/*
bun run registry:generate
```

Run `bun run registry:build` before handoff when the published item JSON (`static/r/*.json`) needs to reflect the change.
