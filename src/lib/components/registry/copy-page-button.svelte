<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { onDestroy } from "svelte";
  import CheckIcon from "@lucide/svelte/icons/check";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import * as DropdownMenu from "$registry/items/components/dropdown-menu/index.js";
  import { registryConfig } from "$registry/config";

  let { text }: { text: string } = $props();
  let copied = $state(false);
  let error = $state(false);
  let timer: ReturnType<typeof setTimeout>;
  const markdownPath = $derived(`${page.url.pathname}.md`);
  const pageUrl = $derived(`${registryConfig.homepage}${page.url.pathname}`);
  const links = $derived([
    { label: "View as Markdown", href: markdownPath },
    ...[
      { label: "Open in ChatGPT", base: "https://chatgpt.com" },
      { label: "Open in Claude", base: "https://claude.ai/new" },
      { label: "Open in Perplexity", base: "https://www.perplexity.ai/search" },
    ].map((item) => ({ label: item.label, href: `${item.base}?q=${encodeURIComponent(`I have questions about this documentation page: ${pageUrl}`)}` })),
  ]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      copied = true; error = false;
    } catch { error = true; }
    clearTimeout(timer);
    timer = setTimeout(() => { copied = false; error = false; }, 1500);
  }
  onDestroy(() => clearTimeout(timer));
</script>
<div class="flex items-center rounded-md border">
  <button type="button" onclick={copy} class="inline-flex items-center gap-1.5 rounded-l-md px-2.5 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring">
    {#if copied}<CheckIcon class="size-3.5" />Copied{:else}<CopyIcon class="size-3.5" />Copy Page{/if}
  </button>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger aria-label="Open page actions menu" class="rounded-r-md border-l p-2 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"><ChevronDownIcon class="size-3.5" /></DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Group>
        {#each links as link (link.label)}
          <DropdownMenu.Item>
            {#snippet child({ props })}<a {...props} href={link.href.startsWith("/") ? resolve("/") + link.href.slice(1) : link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>{/snippet}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  <span class="sr-only" role="status">{error ? "Unable to copy. Use View as Markdown." : copied ? "Copied page" : ""}</span>
</div>
