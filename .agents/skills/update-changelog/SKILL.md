---
name: update-changelog
description: >-
  Update registry/docs/changelog.svx after user-facing registry, component,
  docs, or install-path changes. Use when finishing registry work, adding or
  changing published items, documenting breaking changes, or when the user
  asks to update the changelog.
---

# Update Changelog

Keep [`registry/docs/changelog.svx`](../../../registry/docs/changelog.svx) current whenever shipped work is user-facing for registry consumers or maintainers.

## When To Run

Run this skill **before handoff** after changes that affect:

- New, renamed, or removed registry items (check the "Current catalog" list stays accurate)
- Published source layout, install `target`s, or file lists in any `_registry.svx`
- Component APIs, variants, defaults, or breaking behavior
- Public docs pages (`registry/docs/*.svx`) that change how consumers install or author items
- Migration notes consumers need

Skip for pure internal refactors with no install, API, docs, or behavior impact (for example renaming a private helper inside an unpublished story).

## This project's changelog shape

Unlike a semver-tagged changelog, this file tracks two things:

1. **"Current catalog"** — a live snapshot of every published item name, grouped by section (`Components`, `Blocks`, `Utilities`) to match the three nav sections in `src/lib/registry/sections.ts` (on-disk `files/` items count toward `Utilities` — see `CATALOG_SECTION_BY_DIR` in `src/lib/registry/catalog.ts`). Keep this list in sync with `find registry/items -mindepth 2 -maxdepth 2 -type d`. **This section does not exist yet in `changelog.svx`** — the file currently only has dated `##` entries. Add the "Current catalog" section (right after the intro paragraph, above the first dated entry) the next time you run this skill, then keep it updated from then on.
2. **Dated/topical sections below it** — short, grouped bullet lists under a `###` heading naming the area of work (for example `### Docs shell`, `### Registry`), nested under a `## <Month> <Day>, <Year>` heading for the day the work landed. Add a new `###` section for the current round of work under today's date (create a new `##` date heading if one for today doesn't exist yet); don't invent version numbers.

## Workflow

1. Read `registry/docs/changelog.svx` in full.
2. Diff the "Current catalog" list (add it if missing, per above) against `registry/items/**` — add new item names, remove deleted ones, keep the three groups (Components/Blocks/Utilities) alphabetized within each. Today's real catalog is small (`accordion`, `badge`, `button`, `card`, `tabs`, `hero`, `cn`, `styles`) — older dated entries mentioning dozens of other item names (`field`, `hover-card`, `sidebar`, etc.) predate this snapshot of the repo and don't reflect files that exist on disk now. Don't delete or "correct" those older entries just because they don't match today's catalog — they're historical. Only correct a dated entry if it describes something that's factually wrong about work that actually happened, not because the catalog later shrank.
3. Summarize **only what landed in this session** from the known edits — prefer consumer impact over implementation detail.
4. Add a new `###` section (short, specific title) with 1–5 bullets, under today's `##` date heading, inserted before any older dated sections (newest first).
5. Match existing tone: short, plain-English bullets, `backtick` component/file names, no commit-message noise.
6. Do not invent unshipped work. Do not rewrite older sections unless correcting a factual error in that section's own claims.

## Bullet Style

Good:

```md
### Code blocks

- Docs and item-usage code fences now render through the same shiki pipeline as the "Code" tab preview, with line numbers and a copy button.
- **Breaking:** `CodeBlock` no longer accepts a `lang` prop directly — pass pre-highlighted `html`.
```

Avoid:

- Commit-style noise (`refactor: move files`)
- Exhaustive file-by-file diffs when a one-line summary is clearer
- Internal-only tooling notes that don't change published items or docs

## After Editing

- Confirm the "Current catalog" section is accurate and the new `###` section sits above older ones.
- Run `bun run registry:generate` if any item's frontmatter changed in the same handoff (changelog itself needs no build step, it's a static `.svx` doc page).
