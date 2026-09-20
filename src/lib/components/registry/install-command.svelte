<script lang="ts">
  import type { Component } from "svelte";
  import CheckIcon from "@lucide/svelte/icons/check";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import NpmLogo from "$lib/components/logos/npm.svelte";
  import PnpmLogo from "$lib/components/logos/pnpm.svelte";
  import YarnLogo from "$lib/components/logos/yarn.svelte";
  import BunLogo from "$lib/components/logos/bun.svelte";
  import VpLogo from "$lib/components/logos/vp.svelte";
  import DenoLogo from "$lib/components/logos/deno.svelte";
  import { cn } from "$lib/utils";
  import { onMount } from "svelte";

  type PackageManager = "npm" | "pnpm" | "yarn" | "bun" | "vp" | "deno";

  const PACKAGE_MANAGERS: { id: PackageManager; icon: Component }[] = [
    { id: "npm", icon: NpmLogo },
    { id: "pnpm", icon: PnpmLogo },
    { id: "yarn", icon: YarnLogo },
    { id: "bun", icon: BunLogo },
    { id: "vp", icon: VpLogo },
    { id: "deno", icon: DenoLogo },
  ];
  const STORAGE_KEY = "package-manager";

  const EXEC_PREFIX: Record<PackageManager, string> = {
    npm: "npx",
    pnpm: "pnpm dlx",
    yarn: "yarn dlx",
    bun: "bun x",
    vp: "vp dlx",
    deno: "deno run -A npm:",
  };
  const ADD_PREFIX: Record<PackageManager, string> = {
    npm: "npm install",
    pnpm: "pnpm add",
    yarn: "yarn add",
    bun: "bun add",
    vp: "vp add",
    deno: "deno add npm:",
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

  let manager = $state<PackageManager>("npm");
  let selected = $derived(
    PACKAGE_MANAGERS.find((pm) => pm.id === manager) ?? PACKAGE_MANAGERS[0],
  );
  let command = $derived.by(() => {
    const prefix = kind === "exec" ? EXEC_PREFIX[manager] : ADD_PREFIX[manager];
    return manager === "deno" ? `${prefix}${args}` : `${prefix} ${args}`;
  });

  onMount(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && PACKAGE_MANAGERS.some((pm) => pm.id === stored)) {
        manager = stored as PackageManager;
      }
    } catch {
      // localStorage can throw in private mode
    }
  });

  function persistManager(value: string) {
    manager = value as PackageManager;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage can throw in private mode
    }
  }

  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

{#snippet logo(Icon: Component)}
  <span class="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-full">
    <Icon />
  </span>
{/snippet}

<div class={cn("not-prose", className)}>
  <InputGroup.Root class="h-10">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Select package manager"
        class="text-foreground flex h-full items-center gap-1.5 border-e px-2.5 text-sm font-medium hover:bg-accent"
      >
        {@render logo(selected.icon)}
        {selected.id}
        <ChevronDownIcon class="size-3.5 text-muted-foreground" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" class="w-44">
        <DropdownMenu.Group>
          <DropdownMenu.RadioGroup value={manager} onValueChange={persistManager}>
            {#each PACKAGE_MANAGERS as pm (pm.id)}
              <DropdownMenu.RadioItem value={pm.id}>
                {@render logo(pm.icon)}
                {pm.id}
              </DropdownMenu.RadioItem>
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    <InputGroup.Input
      readonly
      value={command}
      aria-label="Install command"
      class="font-mono text-muted-foreground"
    />
    <InputGroup.Addon align="inline-end">
      <InputGroup.Button
        size="icon-xs"
        onclick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
      >
        {#if copied}
          <CheckIcon />
        {:else}
          <CopyIcon />
        {/if}
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
