<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import { cn } from "$lib/utils";

  let { class: className }: { class?: string } = $props();

  let isDark = $state(false);

  $effect(() => {
    isDark = document.documentElement.classList.contains("dark");
  });

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    isDark = next === "dark";
  }
</script>

<button
  type="button"
  onclick={toggleTheme}
  aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
  class={cn(
    "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
    className,
  )}
>
  {#if isDark}
    <SunIcon data-icon="inline-start" class="size-4" />
  {:else}
    <MoonIcon data-icon="inline-start" class="size-4" />
  {/if}
</button>
