---
name: property-testing
description: >-
  Write fast-check property tests for registry variant modules (`*.variants.ts`)
  with Vitest, and keep Storybook stories as authored browser examples. Use when
  adding or changing a component test, a `*.variants.ts` module, fast-check, or
  property-based tests.
---

# Property testing

Variant class logic is tested with fast-check in the Vitest `unit` project. Storybook's Vitest browser project renders authored stories. Do not call `fc.assert` from a story `play` function.

## When to use

- A component exports `*Variants` from `*.variants.ts`
- You are adding or changing tests for those classes
- The user mentions fast-check or property-based tests

DOM behavior that is a small fixed enum (button vs anchor, heading level) stays on the existing story. Do not generate random stories.

Stories and property tests stay aligned on the option lists because both import the arrays exported from `*.variants.ts` (`BUTTON_VARIANTS`, `HEADING_SIZES`, and the rest). Those arrays are `Object.keys` of the variant object, so a new key shows up in Storybook controls and in fast-check together. They do not run the same cases: fast-check generates combinations of those keys, and Storybook only renders the stories you write.

## File layout

```
registry/items/<section>/<name>/tests/
  <name>.variants.test.ts
```

Put the test in `tests/` for that item, the same way stories live in `stories/`. Do not colocate `*.test.ts` beside the source. Do not list `tests/` in `_registry.svx` `files`.

Copy `registry/items/components/heading/tests/heading.variants.test.ts`. Button and text follow the same shape. Import the variant module from `../<name>.variants`.

## How to write the test

Import `describe`, `expect`, and `test` from `vite-plus/test`. Import `fc` from `fast-check`. Do not import from `vitest` or `@fast-check/vitest`.

Build arbitraries with `oneOf` from `$lib/testing/variants` and the arrays the module already exports (`HEADING_SIZES`, `BUTTON_VARIANTS`, and the rest). Do not hand-write a second options list.

Assert, for generated props:

- The call returns a string.
- Chosen axis classes are still present after `tv` / `cn`. Use `expectAxis` when each option's classes are mutually exclusive (heading and text size, weight, tone, align). Use `expectTokens` when options share classes (button variant).
- Omitted props match `defaultVariants`.
- Merging `unrelatedClass` through `cn` does not drop the selected size or weight. This is the same merge the component does: `cn(componentVariants(props), className)`.

Theme sizes such as `text-60` must survive a tone such as `text-foreground`.

## Replay a failure

`fc.assert` prints a seed, a path, and the shrunk counterexample. Re-run that case with the printed values:

```ts
fc.assert(fc.property(/* same arbitraries */, predicate), { seed, path, numRuns: 1 });
```

## Run

`vp test` runs the unit project and the Storybook browser project. `vp test --project unit` runs property tests only.
