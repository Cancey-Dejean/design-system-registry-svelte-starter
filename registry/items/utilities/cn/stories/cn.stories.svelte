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
    class={cn(
      "rounded-md border px-4 py-2 text-sm",
      active && "border-primary bg-primary text-primary-foreground",
    )}
    onclick={() => (active = !active)}
  >
    {active ? "Active" : "Inactive"}
  </button>
</Story>
