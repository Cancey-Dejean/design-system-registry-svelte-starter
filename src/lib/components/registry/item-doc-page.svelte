<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import InstallCommand from "./install-command.svelte";
  import CodeBlock from "./code-block.svelte";
  import {
    getRegistryItemContent,
    loadRegistryItemPreview,
    type RegistryItemMetadata,
  } from "$lib/registry/catalog";
  import type { RegistrySectionId } from "$lib/registry/sections";
  import { registryConfig } from "$registry/config";

  let {
    section,
    name,
    metadata,
    previewSourceHtml,
  }: {
    section: RegistrySectionId;
    name: string;
    metadata: RegistryItemMetadata;
    previewSourceHtml: string;
  } = $props();

  let content = $derived(getRegistryItemContent(section, name));
  let previewPromise = $derived(loadRegistryItemPreview(section, name));
  let dependencyCommand = $derived(
    metadata.dependencies?.length ? `bun add ${metadata.dependencies.join(" ")}` : null,
  );
  let cliCommand = $derived(
    `bun x shadcn-svelte@latest add ${registryConfig.homepage}/r/${name}.json`,
  );
</script>

<div class="mx-auto flex max-w-3xl flex-col gap-8 py-8">
  <header class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-semibold tracking-tight">{metadata.title}</h1>
      <Badge variant="secondary">{metadata.type}</Badge>
    </div>
    {#if metadata.description}
      <p class="text-lg text-muted-foreground">{metadata.description}</p>
    {/if}
  </header>

  <section class="flex flex-col gap-3">
    <Tabs.Root value="preview">
      <Tabs.List>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="preview">
        <div class="flex min-h-48 items-center justify-center rounded-md border p-8">
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
    <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
    <Tabs.Root value="cli">
      <Tabs.List>
        <Tabs.Trigger value="cli">CLI</Tabs.Trigger>
        <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="cli">
        <InstallCommand command={cliCommand} />
      </Tabs.Content>
      <Tabs.Content value="manual">
        <div class="flex flex-col gap-4">
          {#if dependencyCommand}
            <div>
              <p class="mb-2 text-sm font-medium">1. Install dependencies</p>
              <InstallCommand command={dependencyCommand} />
            </div>
          {/if}
          {#if metadata.files?.length}
            <div>
              <p class="mb-2 text-sm font-medium">
                {dependencyCommand ? "2." : "1."} Copy these files into your project
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
      <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
      <div class="prose dark:prose-invert max-w-none">
        <content.Body />
      </div>
    </section>
  {/if}
</div>
