<script lang="ts" module>
  import Columns3Icon from "@lucide/svelte/icons/columns-3";
  import CrosshairIcon from "@lucide/svelte/icons/crosshair";
  import WorkflowIcon from "@lucide/svelte/icons/workflow";

  import type { FlowIcon } from "./flow-nodes";
  import type { FlowLayout } from "./flow-layout";

  export const flowLayoutOptions = [
    { id: "map", label: "Registry map", icon: WorkflowIcon },
    { id: "lanes", label: "Lineage lanes", icon: Columns3Icon },
    { id: "chain", label: "Install chain", icon: CrosshairIcon },
  ] as const satisfies readonly { id: FlowLayout; label: string; icon: FlowIcon }[];
</script>

<script lang="ts">
  import * as Tooltip from "$registry/items/components/tooltip/index.js";
  import { cn } from "$lib/utils";

  let {
    value,
    onValueChange,
    class: className,
  }: {
    value: FlowLayout;
    onValueChange: (layout: FlowLayout) => void;
    class?: string;
  } = $props();
</script>

<fieldset
  class={cn(
    "inline-flex items-center gap-0.5 rounded-lg border bg-card p-0.5 shadow-xs",
    className,
  )}
>
  <legend class="sr-only">Layout</legend>
  <span
    aria-hidden="true"
    class="px-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
  >
    Layout
  </span>
  <span aria-hidden="true" class="mr-0.5 h-4 w-px bg-border"></span>
  {#each flowLayoutOptions as option (option.id)}
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <label
            {...props}
            class="grid size-7 cursor-pointer place-items-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground has-checked:border-[#ff3e00]/50 has-checked:bg-[#ff3e00]/10 has-checked:text-[#d63600] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-[#ff3e00] dark:has-checked:text-[#ff6b3d]"
          >
            <input
              type="radio"
              name="flow-layout"
              value={option.id}
              checked={option.id === value}
              onchange={() => onValueChange(option.id)}
              class="sr-only"
            />
            <option.icon aria-hidden="true" class="size-3.5" strokeWidth={1.75} />
            <span class="sr-only">{option.label}</span>
          </label>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">{option.label}</Tooltip.Content>
    </Tooltip.Root>
  {/each}
</fieldset>
