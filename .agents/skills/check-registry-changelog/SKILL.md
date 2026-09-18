---
name: check-registry-changelog
description: >-
  Check whether a registry item was created, renamed, or removed and the
  changelog's "Current catalog" list wasn't updated to match. Use after
  scaffolding a new registry item, deleting or renaming one, or before
  handoff whenever registry/items/** changed, to catch a catalog that's
  drifted out of sync.
---

# Check Registry Changelog

A narrow, mechanical check: does [`registry/docs/changelog.svx`](../../../registry/docs/changelog.svx)'s "Current catalog" list still match what's actually on disk under `registry/items/**`? This is the one piece of [`update-changelog`](../update-changelog/SKILL.md) that's easy to forget because it's easy to verify mechanically instead of by memory — run this any time you're not sure, and definitely after creating, deleting, or renaming an item folder.

This skill only handles catalog membership (which items exist, in which section). It does not write prose changelog entries for API changes, docs changes, or other non-catalog work — that's `update-changelog`'s job. Run this first; if it finds catalog drift, use `update-changelog`'s bullet-writing conventions for the entry text.

## When To Run

- After scaffolding a new registry item (any new folder under `registry/items/components/`, `registry/items/blocks/`, `registry/items/utilities/`, or `registry/items/files/`)
- After deleting or renaming an item folder
- Before handoff, whenever `registry/items/**` changed during the session and you're not certain the changelog was touched
- Proactively, any time you want to confirm the changelog isn't stale — it's cheap to check

Skip if no folder under `registry/items/**` was added, removed, or renamed this session — editing an existing item's internals doesn't require this check (though it may still need an `update-changelog` entry for the API/behavior change itself).

## Workflow

1. List what's actually on disk, grouped by section:

   ```sh
   find registry/items -mindepth 2 -maxdepth 2 -type d | sort
   ```

   Map each folder to its catalog group the same way `CATALOG_SECTION_BY_DIR` in `src/lib/registry/catalog.ts` does: `components` → Components, `blocks` → Blocks, `utilities` and `files` → Utilities. A folder under any other on-disk root isn't part of the catalog at all — flag that separately, it's a `sync-registry-metadata` problem, not a changelog one.

2. Read the "Current catalog" section in `registry/docs/changelog.svx` (it sits right after the intro paragraph, above the first dated `##` entry). If the section doesn't exist yet, that itself is the finding — it needs to be created from the disk listing.

3. Diff the two lists:
   - **On disk but not in the catalog** → a new item that was never added to the changelog.
   - **In the catalog but not on disk** → an item that was deleted or renamed and the old name was never removed.

4. If the diff is empty, say so and stop — no edit needed.

5. If the diff is non-empty, fix the "Current catalog" list in place (add the new names, drop the stale ones, keep each group alphabetized), then add or extend today's dated `##` entry with a short bullet naming what changed, in `update-changelog`'s style (plain-English, `backtick` item names, e.g. "Added `alert` to the Components catalog." or "Removed `hero-split`, superseded by `hero`."). Don't touch older dated entries.

## After Editing

- Re-run the `find` from step 1 against the updated "Current catalog" list once more to confirm they match exactly.
- If you also changed the item's `_registry.svx`, run `bun run registry:doctor` and `bun run registry:generate` — this skill doesn't validate registry metadata itself, only changelog/catalog sync.
