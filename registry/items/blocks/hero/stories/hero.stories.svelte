<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Hero from "../hero.svelte";

  const { Story } = defineMeta({
    title: "Blocks/Hero",
    component: Hero,
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  args={{
    announcement: "New: v2.0 is here",
    title: "Build your design system faster",
    description: "A shadcn-svelte based component registry, ready to install into any project.",
    primaryCta: { label: "Get Started", href: "/docs/installation" },
    secondaryCta: { label: "Browse components", href: "/components" },
  }}
/>
