<script lang="ts">
  import PaletteIcon from "@lucide/svelte/icons/palette";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { accentThemes, ACCENT_THEME_STORAGE_KEY } from "$lib/accent-theme";
  import { cn } from "$lib/utils";

  let accent = $state("default");

  $effect(() => {
    accent = document.documentElement.getAttribute("data-accent") ?? "default";
  });

  function applyAccent(next: string) {
    accent = next;
    if (next === "default") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", next);
    }
    localStorage.setItem(ACCENT_THEME_STORAGE_KEY, next);
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={cn(
      "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
    )}
    aria-label="Change accent color"
  >
    <PaletteIcon data-icon="inline-start" class="size-4" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.RadioGroup value={accent} onValueChange={applyAccent}>
      {#each accentThemes as theme (theme.id)}
        <DropdownMenu.RadioItem value={theme.id}>
          <span class={cn("size-3 rounded-full", theme.swatchClass)}></span>
          {theme.label}
        </DropdownMenu.RadioItem>
      {/each}
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>
