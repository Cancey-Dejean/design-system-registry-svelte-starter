<script lang="ts">
  import { onMount, tick, type Component } from "svelte";
  import ComponentPreview from "./component-preview.svelte";
  import { loadRegistryItemPreview } from "$lib/registry/catalog";
  let { section, name }: { section: "components" | "blocks"; name: string } = $props();
  let Preview: Component | null = $state(null);
  let failed = $state(false);
  onMount(() => {
    document.body.setAttribute("data-block-preview", "");
    let cancelled = false;
    void (async () => {
      try {
        const component = await loadRegistryItemPreview(section, name);
        if (cancelled) return;
        Preview = component;
        if (!component) failed = true;
        await tick();
        if (!cancelled) window.parent.postMessage({ type: component ? "registry-preview-ready" : "registry-preview-error", name }, window.location.origin);
      } catch {
        if (!cancelled) { failed = true; window.parent.postMessage({ type: "registry-preview-error", name }, window.location.origin); }
      }
    })();
    return () => { cancelled = true; document.body.removeAttribute("data-block-preview"); };
  });
</script>
<svelte:head><meta name="robots" content="noindex" /></svelte:head>
<main class={section === "components" ? "flex min-h-svh items-center justify-center p-8" : "min-h-svh"}>
  {#if Preview}
    <div class={section === "components" ? "w-full max-w-xl" : "w-full"}>
      <ComponentPreview><Preview /></ComponentPreview>
    </div>
  {:else if failed}<p class="text-sm text-muted-foreground">No preview available.</p>{/if}
</main>
