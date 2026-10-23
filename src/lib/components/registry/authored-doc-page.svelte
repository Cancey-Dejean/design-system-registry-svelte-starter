<script lang="ts">
  import { getDoc, getDocRawSource } from "$lib/registry/docs-catalog";
  import PageToc from "$lib/components/registry/page-toc.svelte";
  import PagePager from "$lib/components/registry/page-pager.svelte";
  import CopyPageButton from "$lib/components/registry/copy-page-button.svelte";
  import { enhanceCodeBlocks } from "$lib/actions/enhance-code-blocks";

  import type { loadDocPage } from "$lib/registry/doc-load";
  import { getDocPath } from "$lib/registry/doc-path";
  import { registryConfig } from "$registry/config";

  let { data }: { data: ReturnType<typeof loadDocPage> } = $props();
  let doc = $derived(getDoc(data.slug));
  let copyPageText = $derived(
    `# ${data.metadata.title}\n\n${getDocRawSource(data.slug) ?? ""}`,
  );
</script>

<svelte:head>
  <title>{data.metadata.title} | {registryConfig.name}</title>
  <meta name="description" content={data.metadata.description} />
  <link rel="canonical" href={`${registryConfig.homepage}${getDocPath(data.slug)}`} />
  <link rel="alternate" type="text/markdown" href={`${getDocPath(data.slug)}.md`} />
</svelte:head>

{#if doc}
  <article id="doc-content" class="flex min-w-0 flex-1 flex-col gap-8">
    <header class="flex flex-col gap-2">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h1 class="text-3xl font-semibold tracking-tight">
        {data.metadata.title}
      </h1>
      <div class="flex items-center gap-2">
        <CopyPageButton text={copyPageText} />
        <PagePager prev={data.prev} next={data.next} />
      </div>
    </div>
    {#if data.metadata.description}
      <p class="text-base text-muted-foreground">{data.metadata.description}</p>
    {/if}
    </header>
    <div
      use:enhanceCodeBlocks
      class="docs-prose prose prose-sm min-w-0 max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-primary prose-p:text-foreground/90 prose-a:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-3 prose-blockquote:*:before:content-none prose-blockquote:*:after:content-none prose-strong:text-primary prose-code:rounded-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-li:text-foreground/80 prose-hr:border-foreground/20 prose-blockquote:[&_p]:text-foreground/75 [&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]"
    >
      <doc.Body />
    </div>
  </article>
  <PageToc items={data.toc} />
{/if}
