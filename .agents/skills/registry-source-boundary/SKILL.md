---
name: registry-source-boundary
description: >-
  Enforce that design-system component source lives only under
  registry/items/**, never duplicated under src/lib/components/**. Use before
  scaffolding or editing any UI component, after adding or editing a
  _registry.svx, or any time you're auditing for duplicate/drifted component
  source between the docs site and the registry.
---

# Registry / Docs-Shell Source Boundary

Two trees in this repo look similar and are not: `registry/items/**` and `src/lib/components/**`. They must never hold the same component.

- **`registry/items/<section>/<name>/`** — the design system. If a component has (or will have) a `_registry.svx`, this folder is the **only** place its `.svelte`/`.ts` source lives.
- **`src/lib/components/**`** — the documentation site's own application shell, and nothing else. Sidebar chrome, breadcrumb-in-the-header, search dialog, theme toggle, story wrapper, and internal shadcn-svelte-primitive wrappers that exist purely to build the docs site's own UI. None of it is published. None of it may duplicate a registry item.

The docs site is a **consumer** of the registry, not a second home for it. It imports published components the same way an external project would after running the install command — via the `$registry` alias (e.g. `$registry/items/components/button/index.js`) — never by re-implementing them under `src/lib/components/ui/`.

## Why this exists

An automated scaffolding pass repeatedly created a second, unreferenced copy of a component under `src/lib/components/ui/<name>/` for items that already existed as registry items (`accordion`, `avatar`, `badge`, `button`, and — as of this writing — `breadcrumb`). The docs site's own shell components (header, dialog, sheet, sidebar, `site-breadcrumb.svelte`, etc.) then imported the wrong copy. The two copies silently drifted apart (different Tailwind classes, missing props, extra props), and `_registry.svx` `files[].path` entries pointed at whichever copy the scaffolder happened to reference — sometimes the real one, sometimes not. None of this shows up as a build error; it just ships a stale or inconsistent component. This skill exists to catch it before that happens again.

## When To Run

- Before scaffolding any new UI component — decide up front whether it's a registry item or docs-shell-only, and put it in the right tree from the start.
- After adding or editing any `_registry.svx` (pairs well with `sync-registry-metadata`).
- Periodically as an audit, or any time something in the docs site looks like it's using an outdated version of a component that was recently changed in its registry item.

## Verification Commands

Run all three. Each should return nothing; any output is a violation.

**1. A name exists in both trees** — the direct symptom of this bug:

```sh
comm -12 \
  <(find registry/items/components registry/items/blocks registry/items/utilities registry/items/files -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort -u) \
  <(find src/lib/components/ui -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort -u)
```

**2. A `_registry.svx` points into `src/lib/components/**`:**

```sh
grep -rn 'src/lib/components' registry/items/*/*/_registry.svx
```

**3. Docs-site code imports a registry item via the wrong path** (only checks names that actually have a `_registry.svx` — a same-named folder under `src/lib/components/ui/` with no registry item is fine and out of scope):

```sh
for name in $(find registry/items -mindepth 3 -maxdepth 3 -name _registry.svx -exec dirname {} \; | xargs -n1 basename); do
  grep -rl "\$lib/components/ui/$name" src registry --include="*.svelte" --include="*.ts" 2>/dev/null
done
```

## Fixing a Violation

Once a name shows up in both trees, `registry/items/<section>/<name>/` always wins if a `_registry.svx` exists there — it's the published source. To fix:

1. Diff the two copies. If they've diverged in a way that's more than formatting (a prop, a variant, a class), read both fully before deciding — don't discard functionality silently. Note it for the user rather than guessing.
2. Delete `src/lib/components/ui/<name>/`.
3. Fix `registry/items/<section>/<name>/_registry.svx`'s `files[].path` to point at `registry/items/<section>/<name>/<file>` (the real on-disk path), not a bare filename or a `src/lib/components/ui/...` path.
4. Fix that item's own `_preview.svelte` and `stories/*.stories.svelte` to import locally (`./index.js` or `../index.js`), not from `$lib/components/ui/<name>`.
5. Find and fix every docs-site consumer (verification command 3 above) to import via `$registry/items/<section>/<name>/index.js` instead of `$lib/components/ui/<name>`.
6. If a folder under `src/lib/components/ui/<name>/` has **no** matching `_registry.svx` anywhere under `registry/items/**` — it's legitimate docs-shell-only infrastructure (as of this writing: `dialog`, `sheet`, `sidebar`, `tooltip`, `command`, `collapsible`, `input`, `input-group`, `separator`, `skeleton`, `textarea`). Leave it alone; do not move it into `registry/items/**` just because it wraps a shadcn-svelte primitive — it only needs to move if someone decides to actually publish it as an installable item, at which point scaffold it properly under `registry/items/components/<name>/` from the start.

## After Fixing

- `bun run registry:doctor` and `bun run registry:generate`.
- `vp check --fix` on every touched file.
- Load the affected item's doc page (`/components/<name>`, `/blocks/<name>`, or `/utilities/<name>`) and any docs-shell page that consumes it in the browser — confirm it renders and nothing else broke.
- If the catalog or an item's behavior changed, run `check-registry-changelog` and `update-changelog`.
