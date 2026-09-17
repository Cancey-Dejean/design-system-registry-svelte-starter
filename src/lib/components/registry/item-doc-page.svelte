<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import TerminalIcon from "@lucide/svelte/icons/terminal";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import AppWindowIcon from "@lucide/svelte/icons/app-window";
  import CodeIcon from "@lucide/svelte/icons/code";
  import InstallCommand from "./install-command.svelte";
  import CodeBlock from "./code-block.svelte";
  import PageToc from "./page-toc.svelte";
  import PagePager from "./page-pager.svelte";
  import CopyPageButton from "./copy-page-button.svelte";
  import { enhanceCodeBlocks } from "$lib/actions/enhance-code-blocks";
  import {
    getRegistryItemContent,
    getRegistryItemRawSource,
    loadRegistryItemPreview,
    type RegistryItemMetadata,
  } from "$lib/registry/catalog";
  import type { RegistrySectionId } from "$lib/registry/sections";
  import type { AdjacentPage } from "$lib/registry/section-loaders";
  import { registryConfig } from "$registry/config";

  let {
    section,
    name,
    metadata,
    previewSourceHtml,
    prev,
    next,
  }: {
    section: RegistrySectionId;
    name: string;
    metadata: RegistryItemMetadata;
    previewSourceHtml: string;
    prev: AdjacentPage | null;
    next: AdjacentPage | null;
  } = $props();

  let content = $derived(getRegistryItemContent(section, name));
  let previewPromise = $derived(loadRegistryItemPreview(section, name));
  let dependencyArgs = $derived(
    metadata.dependencies?.length ? metadata.dependencies.join(" ") : null,
  );
  let cliArgs = $derived(
    `shadcn-svelte@latest add ${registryConfig.homepage}/r/${name}.json`,
  );
  let copyPageText = $derived(
    `# ${metadata.title}\n\n${getRegistryItemRawSource(section, name) ?? ""}`,
  );
  let tocItems = $derived([
    { id: "installation", label: "Installation" },
    ...(content ? [{ id: "usage", label: "Usage" }] : []),
  ]);
</script>

<article id="item-doc-content" class="flex min-w-0 flex-1 flex-col gap-8">
  <header class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2">
      <h1 class="text-3xl font-semibold tracking-tight">{metadata.title}</h1>
      <div class="flex items-center gap-2">
        <CopyPageButton text={copyPageText} />
        <PagePager {prev} {next} />
      </div>
    </div>
    {#if metadata.description}
      <p class="text-lg text-muted-foreground">{metadata.description}</p>
    {/if}
  </header>

  <section class="flex flex-col gap-3">
    <Tabs.Root value="preview">
      <Tabs.List variant="line">
        <Tabs.Trigger value="preview">
          <AppWindowIcon data-icon="inline-start" class="size-4" />
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger value="code">
          <CodeIcon data-icon="inline-start" class="size-4" />
          Code
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="preview">
        <div
          class="flex min-h-48 items-center justify-center rounded-md border p-8"
        >
          {#await previewPromise}
            <p class="text-sm text-muted-foreground">Loading preview…</p>
          {:then Preview}
            {#if Preview}
              <Preview />
            {:else}
              <p class="text-sm text-muted-foreground">No preview available.</p>
            {/if}
          {/await}
        </div>
      </Tabs.Content>
      <Tabs.Content value="code">
        <CodeBlock html={previewSourceHtml} />
      </Tabs.Content>
    </Tabs.Root>
  </section>

  <section class="flex flex-col gap-3">
    <h2 id="installation" class="text-xl font-semibold tracking-tight">
      Installation
    </h2>
    <Tabs.Root value="cli">
      <Tabs.List variant="line">
        <Tabs.Trigger value="cli">
          <TerminalIcon data-icon="inline-start" class="size-4" />
          CLI
        </Tabs.Trigger>
        <Tabs.Trigger value="manual">
          <CopyIcon data-icon="inline-start" class="size-4" />
          Manual
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="cli">
        <InstallCommand kind="exec" args={cliArgs} />
      </Tabs.Content>
      <Tabs.Content value="manual">
        <div class="flex flex-col gap-4">
          {#if dependencyArgs}
            <div>
              <p class="mb-2 text-sm font-medium">1. Install dependencies</p>
              <InstallCommand kind="add" args={dependencyArgs} />
            </div>
          {/if}
          {#if metadata.files?.length}
            <div>
              <p class="mb-2 text-sm font-medium">
                {dependencyArgs ? "2." : "1."} Copy these files into your project
              </p>
              <ul class="flex flex-col gap-1 text-sm text-muted-foreground">
                {#each metadata.files as file (file.target)}
                  <li class="font-mono">{file.target}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  </section>

  {#if content}
    <section class="flex flex-col gap-3">
      <h2 id="usage" class="text-xl font-semibold tracking-tight">Usage</h2>
      <div
        use:enhanceCodeBlocks
        class="prose prose-sm min-w-0 max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-primary prose-p:text-foreground/90 prose-a:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-3 prose-blockquote:*:before:content-none prose-blockquote:*:after:content-none prose-strong:text-primary prose-code:rounded-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-li:text-foreground/80 prose-hr:border-foreground/20 prose-blockquote:[&_p]:text-foreground/75 [&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]"
      >
        <content.Body />
      </div>
    </section>
  {/if}
</article>
<PageToc items={tocItems} />
