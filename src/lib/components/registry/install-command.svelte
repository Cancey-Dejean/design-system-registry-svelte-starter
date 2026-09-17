<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import { cn } from "$lib/utils";

  type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

  const PACKAGE_MANAGERS: PackageManager[] = ["bun", "npm", "pnpm", "yarn"];
  const STORAGE_KEY = "package-manager";

  const EXEC_PREFIX: Record<PackageManager, string> = {
    bun: "bunx",
    npm: "npx",
    pnpm: "pnpm dlx",
    yarn: "yarn dlx",
  };
  const ADD_PREFIX: Record<PackageManager, string> = {
    bun: "bun add",
    npm: "npm install",
    pnpm: "pnpm add",
    yarn: "yarn add",
  };

  let {
    kind,
    args,
    class: className,
  }: {
    /** "exec" runs a one-off CLI command (e.g. shadcn-svelte add); "add" installs packages. */
    kind: "exec" | "add";
    args: string;
    class?: string;
  } = $props();

  let manager = $state<PackageManager>("bun");

  $effect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (PACKAGE_MANAGERS as string[]).includes(stored)) {
        manager = stored as PackageManager;
      }
    } catch {}
  });

  function selectManager(next: PackageManager) {
    manager = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  let command = $derived(`${kind === "exec" ? EXEC_PREFIX[manager] : ADD_PREFIX[manager]} ${args}`);

  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div class={cn("flex flex-col gap-1", className)}>
  <div class="flex gap-1">
    {#each PACKAGE_MANAGERS as pm (pm)}
      <button
        type="button"
        onclick={() => selectManager(pm)}
        class={cn(
          "rounded px-2 py-1 text-xs",
          pm === manager
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {pm}
      </button>
    {/each}
  </div>
  <div class="flex items-center justify-between gap-2 rounded-md border bg-muted px-3 py-2 font-mono text-sm">
    <code class="overflow-x-auto whitespace-pre">{command}</code>
    <button
      type="button"
      onclick={copy}
      aria-label="Copy command"
      class="inline-flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    >
      {#if copied}
        <CheckIcon class="size-3.5" />
      {:else}
        <CopyIcon class="size-3.5" />
      {/if}
    </button>
  </div>
</div>
