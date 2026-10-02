---
name: designing-before-implementation
description: >
  Use when designing, restyling, or implementing any UI — a screen, component,
  layout, page, flow, section, empty state, or visual change — including when
  the user asks to build, code, or implement it directly. Use before writing
  implementation code whenever a design still needs to be made.
---

# Designing before implementation

For every design that needs to be made, research should be done using Mobbin MCP, and 3 design examples should be created and approved before implementation in the project.

**Violating the letter of this rule is violating the spirit of this rule.**

## When this applies

Apply when the work produces a new or changed visual design.

Skip when nothing visual changes: bug fixes, refactors, copy, types, tests, or registry metadata. A "small tweak" that changes layout, hierarchy, or look still goes through the gate.

## Gate

Do not create or edit project implementation files for the design until the user approves one example.

No exceptions:

- Do not implement a draft so they can compare options in the app
- Do not treat a detailed prompt as approval
- Do not substitute memory or a generic pattern for a Mobbin search
- Do not describe Mobbin results from metadata; examine the returned images
- Do not invent screens, apps, or links

The only waiver is an explicit instruction to skip research, skip the examples, or implement a design the user already chose. "Build it", "make it look good", and "just implement" are not waivers.

## 1. Research with Mobbin

Discover `plugin-mobbin-mobbin` and call the tool that matches the design. If the namespace needs auth, authenticate and retry. If search is still unavailable, stop and say so. Do not implement.

| Need | Tool |
|------|------|
| One screen or component | `search_screens` |
| Multi-step journey | `search_flows` |
| Website section (hero, pricing, footer) | `search_sections` |

- Platform is `web` unless the design is iOS. Never put ios or web in the query.
- One intent per search. Run another search for a second screen or flow.
- For `search_screens`, use `mode: "deep"` and a limit of 5–8.
- Reuse the same `task_intent` and set `output_destination` to `code` on every call for the task.
- Queries name the UI elements and how they relate. Leave out style adjectives, negations, and keyword lists.
- Read the images. Cite each screen you rely on as a markdown link to its `mobbin_url`.

## 2. Create 3 design examples

Author three original directions for this project. They must differ in structure or interaction, not only in color. Each example:

- Names the direction
- Describes layout, hierarchy, and the main interaction
- Says what it takes from the research and what it leaves out
- Links the Mobbin screens it is based on

Fit the project's existing visual language when one exists. Do not copy a production screen into the repo.

Present all three in one message, then stop.

## 3. Approval

Wait until the user chooses an example, or names a specific combination. That choice is the approval. Implement only the approved direction.

If they ask for changes, revise the examples and wait again. Do not start implementation between revisions.

## Red flags

- Writing component, page, or style files before a choice
- One example, or three recolors of one layout
- A Mobbin search whose images you did not look at
- "This pattern is standard"
- "They want it implemented, so the options can come after"

| Excuse | Reality |
|--------|---------|
| Too small to research | If the look changes, research it. |
| The prompt already specifies the UI | The prompt is the brief. Approval still requires three examples. |
| I'll code all three for comparison | Comparison happens in the proposal, before project files change. |
| I'll search after a first pass | The first pass is the three examples. |
