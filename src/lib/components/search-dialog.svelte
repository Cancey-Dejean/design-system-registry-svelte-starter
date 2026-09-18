<script lang="ts">
  import { goto } from "$app/navigation";
  import * as Command from "$registry/items/components/command/index.js";
  import { create, insertMultiple, search as oramaSearch, type AnyOrama } from "@orama/orama";
  import SearchIcon from "@lucide/svelte/icons/search";
  import type { SearchIndexEntry } from "$lib/search/build-index";

  let open = $state(false);
  let query = $state("");
  let results = $state<SearchIndexEntry[]>([]);
  let dbPromise: Promise<AnyOrama> | null = null;

  function getDb() {
    dbPromise ??= (async () => {
      const db = create({
        schema: { title: "string", description: "string", url: "string", section: "string" },
      });
      const entries: SearchIndexEntry[] = await fetch("/search-index.json").then((r) => r.json());
      await insertMultiple(db, entries);
      return db;
    })();
    return dbPromise;
  }

  $effect(() => {
    const currentQuery = query.trim();
    if (!currentQuery) {
      results = [];
      return;
    }
    let cancelled = false;
    (async () => {
      const db = await getDb();
      const { hits } = await oramaSearch(db, { term: currentQuery, limit: 8 });
      if (!cancelled) results = hits.map((hit) => hit.document as unknown as SearchIndexEntry);
    })();
    return () => {
      cancelled = true;
    };
  });

  function select(url: string) {
    open = false;
    query = "";
    goto(url);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<button
  type="button"
  onclick={() => (open = true)}
  class="flex w-full items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent"
>
  <SearchIcon class="size-4" />
  <span class="flex-1 text-start">Search...</span>
  <kbd class="rounded border bg-muted px-1.5 py-0.5 text-xs">⌘K</kbd>
</button>

<Command.Dialog
  bind:open
  shouldFilter={false}
  title="Search"
  description="Search docs, components, blocks, and utilities"
>
  <Command.Input placeholder="Search docs and components..." bind:value={query} />
  <Command.List>
    {#if query.trim() && results.length === 0}
      <Command.Empty>No results found.</Command.Empty>
    {/if}
    {#if results.length}
      <Command.Group heading="Results">
        {#each results as result (result.url)}
          <Command.LinkItem href={result.url} onSelect={() => select(result.url)}>
            <div class="flex flex-col">
              <span>{result.title}</span>
              <span class="text-xs text-muted-foreground">{result.section}</span>
            </div>
          </Command.LinkItem>
        {/each}
      </Command.Group>
    {/if}
  </Command.List>
</Command.Dialog>
