<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import SearchIcon from "@lucide/svelte/icons/search";
  import GridIcon from "@lucide/svelte/icons/layout-grid";
  import ListIcon from "@lucide/svelte/icons/panels-top-left";
  import ArrowIcon from "@lucide/svelte/icons/arrow-up-right";
  import { cn } from "$lib/utils";
  import { Button } from "$registry/items/components/button/index.js";
  import { Badge } from "$registry/items/components/badge/index.js";
  import GalleryPreview from "./gallery-preview.svelte";
  import { filterGalleryItems, getGalleryCategories, getBlockCategory, type GalleryItem } from "$lib/registry/gallery";
  import { registryConfig } from "$registry/config";

  let { items, section }: { items: GalleryItem[]; section: "components" | "blocks" } = $props();
  let query = $state("");
  let view = $state("grid");
  const isComponents = $derived(section === "components");
  const title = $derived(isComponents ? "Components" : "Blocks");
  const description = $derived(isComponents ? "Installable UI primitives and components." : "Composed templates and larger UI sections.");
  const categories = $derived(getGalleryCategories(items));
  const category = $derived(isComponents ? "all" : page.url.searchParams.get("category") ?? "all");
  const visible = $derived(filterGalleryItems(items, query, category));

  function reset() {
    query = "";
    if (!isComponents) void goto(resolve("blocks"), { reset: false });
  }
</script>

<svelte:head>
  <title>{title} | {registryConfig.name}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`${registryConfig.homepage}/${section}`} />
</svelte:head>
<section class="flex min-w-0 flex-1 flex-col gap-6 pb-8" aria-label={isComponents ? "Component gallery" : "Block gallery"}>
  <header class="flex flex-col gap-2">
    <h1 class="text-3xl font-semibold tracking-tight">{title}</h1>
    <p class="text-base text-muted-foreground">{description}</p>
  </header>
  {#if !isComponents}
    <nav aria-label="Block categories" class="flex gap-5 overflow-x-auto border-b">
      {#each [{ id: "all", title: "All blocks", count: items.length }, ...categories] as group (group.id)}
        <a href={resolve("blocks") + (group.id === "all" ? "" : `?category=${encodeURIComponent(group.id)}`)} aria-current={category === group.id ? "page" : undefined} class={cn("flex shrink-0 items-center gap-2 border-b-2 py-3 text-sm font-medium transition-colors", category === group.id ? "border-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
          {group.title}<Badge variant="secondary">{group.count}</Badge>
        </a>
      {/each}
    </nav>
  {/if}
  <div class="flex items-center justify-between gap-3">
    <search class="w-full max-w-xs">
      <label class="flex h-9 items-center gap-2 rounded-md border bg-input/30 px-3 text-muted-foreground">
        <SearchIcon class="size-4 shrink-0" aria-hidden="true" />
        <input type="search" bind:value={query} aria-label={`Search ${section}`} placeholder={`Search ${section}…`} class="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
      </label>
    </search>
    <div class="flex shrink-0 gap-1 rounded-lg bg-muted p-1" role="group" aria-label="Gallery layout">
      <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onclick={() => (view = "grid")} class={cn("rounded-md p-1.5 focus-visible:ring-2 focus-visible:ring-ring", view === "grid" && "bg-background shadow-sm")}><GridIcon class="size-4" /></button>
      <button type="button" aria-label="List view" aria-pressed={view === "list"} onclick={() => (view = "list")} class={cn("rounded-md p-1.5 focus-visible:ring-2 focus-visible:ring-ring", view === "list" && "bg-background shadow-sm")}><ListIcon class="size-4" /></button>
    </div>
  </div>
  <output class="sr-only" aria-live="polite">{visible.length} {section}</output>
  <ul class={cn("grid min-w-0 gap-5", view === "grid" ? "sm:grid-cols-2 min-[92.5rem]:grid-cols-3" : "gap-10")}>
    {#each visible as item (item.name)}
      <li class="min-w-0">
        <a href={section === "components" ? resolve("/(app)/components/[name]", { name: item.name }) : resolve("/(app)/blocks/[name]", { name: item.name })} aria-label={`View ${item.metadata.title}`} class={cn("group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50", view === "grid" && "border p-1 transition-colors hover:border-foreground/30")}>
          <GalleryPreview name={item.name} title={item.metadata.title} {section} stacked={view === "list"} />
          <div class={cn("flex items-center justify-between gap-4", view === "grid" ? "px-3 py-4" : "pb-3")}>
            <div class="flex min-w-0 flex-col items-start gap-2">
              <h2 class={cn("font-semibold tracking-tight", view === "grid" ? "text-lg" : "text-xl")}>{item.metadata.title}</h2>
              <Badge variant="outline">{isComponents ? "Component" : getBlockCategory(item.name).title}</Badge>
            </div>
            <span class="flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:bg-muted" aria-hidden="true"><ArrowIcon class="size-4" /></span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
  {#if visible.length === 0}
    <div class="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
      <h2 class="text-lg font-semibold">No {section} found</h2>
      <p class="text-sm text-muted-foreground">Try another search or category.</p>
      <Button variant="outline" onclick={reset}>Reset filters</Button>
    </div>
  {/if}
</section>
