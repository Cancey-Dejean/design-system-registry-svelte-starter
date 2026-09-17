---
name: writing-story-files
description: Use when adding, updating, or scaffolding Storybook stories for registry items (`*.stories.svelte`, `stories/`, `defineMeta`/`Story` CSF), when asked how to write a story file, or when a new component, block, or utility needs a Storybook story.
---

# Writing Story Files

Stories are authoring-only. Copy an existing story in the same section as your starting point — `button.stories.svelte` for variant-driven components, `card.stories.svelte`/`accordion.stories.svelte`/`tabs.stories.svelte` for multi-part components, `hero.stories.svelte`/`announcement-bar.stories.svelte` for blocks, `cn.stories.svelte` for utilities.

## When to Use

- New registry item needs a story
- User asks to write or update a `*.stories.svelte` file
- Choosing which existing story to copy

## File layout

```
registry/items/<section>/<name>/stories/
  <name>.stories.svelte
```

`<section>` is `components`, `blocks`, or `utilities` (see `src/lib/registry/sections.ts`). Do not colocate `*.stories.svelte` beside the component source. Do not list `stories/` in `_registry.svx` `files`. Storybook loads `registry/items/**/*.stories.svelte`; `bun run registry:generate` never touches these, so there's nothing to keep in sync.

| Item folder | `title` |
|-------------|---------|
| `components/` | `Components/<PascalName>` |
| `blocks/` | `Blocks/<PascalName>` |
| `utilities/` | `Utilities/<PascalName or exportName>` |

## Single-component item (e.g. Button, Badge)

```svelte
<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Button } from "$lib/components/ui/button";

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
      },
      size: {
        control: { type: "select" },
        options: ["default", "xs", "sm", "lg", "icon"],
      },
    },
  });
</script>

<Story name="Default">Button</Story>
<Story name="Outline" args={{ variant: "outline" }}>Outline</Story>
<Story name="Destructive" args={{ variant: "destructive" }}>Delete</Story>
```

Required:

- `defineMeta`/`Story` from `@storybook/addon-svelte-csf`, not React CSF types
- `tags: ["autodocs"]`
- `argTypes` with an explicit `options` array per variant/size axis, matching the component's real union type (`ButtonVariant`, `ButtonSize`, …) — this project doesn't export `Object.keys()` constant arrays for these, so list the options by hand and keep them in sync with the component
- A `Default` story with no `args` (or the component's real defaults), plus one story per variant/state worth showing

## Multi-part component item (e.g. Card, Tabs, Accordion)

Import the namespace for markup plus the `Root` part (aliased) for `component:`, then compose the real sub-parts inside the story body — there's no separate demo file or wrapper component in this project:

```svelte
<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import * as Card from "$lib/components/ui/card";
  import { Root as CardRoot } from "$lib/components/ui/card";

  const { Story } = defineMeta({
    title: "Components/Card",
    component: CardRoot,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Card title</Card.Title>
      <Card.Description>Card description.</Card.Description>
    </Card.Header>
    <Card.Content>Card content.</Card.Content>
  </Card.Root>
</Story>
```

## Block item (e.g. Hero, Announcement Bar)

Import the single default-exported component directly and pass its full prop shape as `args`:

```svelte
<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import AnnouncementBar from "../announcement-bar.svelte";

  const { Story } = defineMeta({
    title: "Blocks/AnnouncementBar",
    component: AnnouncementBar,
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  args={{ message: "We just shipped a new design system.", href: "/docs/changelog" }}
/>
<Story name="No link" args={{ message: "Scheduled maintenance this weekend." }} />
```

## Utility item (e.g. cn)

No `component:` — there's nothing to render as a Story's own element, so demonstrate the utility through a small inline example:

```svelte
<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { cn } from "$lib/utils";

  const { Story } = defineMeta({
    title: "Utilities/cn",
    tags: ["autodocs"],
  });

  let active = $state(true);
</script>

<Story name="Default">
  <button
    type="button"
    class={cn("rounded-md border px-4 py-2 text-sm", active && "border-primary bg-primary text-primary-foreground")}
    onclick={() => (active = !active)}
  >
    {active ? "Active" : "Inactive"}
  </button>
</Story>
```

## Common Mistakes

| Excuse | Reality |
|--------|---------|
| "Use `StoryObj`/`Meta` types like React" | This project uses `@storybook/addon-svelte-csf`'s `defineMeta`/`Story`, not React CSF. |
| "Hardcode `options: ['sm', 'md']` from memory" | Check the component's actual variant union (its `.svelte` module script) before listing options. |
| "Need a separate demo-*.svelte wrapper" | No such convention here — compose real sub-parts directly in the `<Story>` body. |
| "List stories in `_registry.svx` `files`" | Stories are never installable; `registry:generate` never reads `stories/`. |
| "Put `<name>.stories.svelte` beside the source" | Always `stories/<name>.stories.svelte`. |
