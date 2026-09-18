<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Search from "@lucide/svelte/icons/search";
  import LogoGrid from "$registry/items/components/logos/logo-grid.svelte";
  import {
    LOGOS,
    type LogoKey,
  } from "$registry/items/components/logos/logos.js";

  const LOGO_LIST = Object.keys(LOGOS) as LogoKey[];

  let query = $state("");
  let debouncedQuery = $state("");
  let feedbackName = $state<LogoKey | null>(null);
  let feedbackKind = $state<"copied" | "downloaded" | null>(null);

  $effect(() => {
    const value = query;
    const id = setTimeout(() => {
      debouncedQuery = value;
    }, 200);
    return () => clearTimeout(id);
  });

  const filtered = $derived(
    LOGO_LIST.filter((name) =>
      name.toLowerCase().includes(debouncedQuery.toLowerCase()),
    ),
  );

  function showFeedback(name: LogoKey, kind: "copied" | "downloaded") {
    feedbackName = name;
    feedbackKind = kind;
    setTimeout(() => {
      if (feedbackName === name) {
        feedbackName = null;
        feedbackKind = null;
      }
    }, 1500);
  }

  function handleClick(name: LogoKey, event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    const el = target?.querySelector("svg, img");
    if (!el) return;

    if (el instanceof HTMLImageElement) {
      const src = el.currentSrc || el.getAttribute("src");
      if (!src) return;

      void fetch(src)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = src.split("/").pop() ?? "logo.png";
          a.click();
          URL.revokeObjectURL(url);
          showFeedback(name, "downloaded");
        })
        .catch(() => {
          /* fetch may fail for non-CORS or invalid URLs */
        });
      return;
    }

    void navigator.clipboard.writeText(el.outerHTML).then(
      () => showFeedback(name, "copied"),
      () => {
        /* clipboard may be unavailable in some environments */
      },
    );
  }
</script>

<div class="flex w-full flex-col gap-6">
  <div class="relative">
    <Search
      class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
    />
    <input
      type="text"
      bind:value={query}
      placeholder="Search logos..."
      class="h-11 w-full rounded-xl border border-border bg-background pr-4 pl-10 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
    />
    {#if query}
      <button
        type="button"
        onclick={() => (query = "")}
        class="absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Clear
      </button>
    {/if}
  </div>

  <div class="flex items-center justify-between">
    <span class="text-xs font-medium text-muted-foreground">
      {filtered.length} logo{filtered.length !== 1 ? "s" : ""}
      {#if debouncedQuery}
        <span class="text-foreground"> matching "{debouncedQuery}"</span>
      {/if}
    </span>
    <span
      class="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase"
    >
      Click to copy SVG or download image
    </span>
  </div>

  {#if filtered.length > 0}
    <LogoGrid
      class="grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    >
      {#each filtered as name (name)}
        {@const Component = LOGOS[name]}
        {@const isImage = name === "main-logo"}
        {@const active = feedbackName === name}
        <button
          type="button"
          onclick={(event) => handleClick(name, event)}
          class="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97]"
        >
          <div
            class={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-primary/95 transition-all duration-200 ${
              active ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div class="flex items-center gap-1.5 text-primary-foreground">
              <Check class="size-3.5" strokeWidth={2.5} />
              <span class="text-xs font-semibold tracking-wide">
                {feedbackKind === "copied" ? "Copied" : "Downloaded"}
              </span>
            </div>
          </div>

          <div
            class="flex items-center justify-center text-foreground transition-colors duration-200 group-hover:text-primary [&_img]:max-h-8 [&_img]:w-auto [&_svg]:max-h-12 [&_svg]:min-w-auto"
          >
            <Component class="size-full object-contain" />
          </div>

          <span
            class="w-full truncate text-center text-[11px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
          >
            {name}
          </span>

          <span
            class="absolute top-2 right-2 text-[9px] font-medium tracking-widest text-muted-foreground uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            {isImage ? "Download" : "SVG"}
          </span>
        </button>
      {/each}
    </LogoGrid>
  {:else}
    <div
      class="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16"
    >
      <Search class="size-6 text-muted-foreground/40" />
      <p class="text-sm text-muted-foreground">
        No logos match "{debouncedQuery}"
      </p>
    </div>
  {/if}
</div>
