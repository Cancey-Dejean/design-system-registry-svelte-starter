<script lang="ts">
  import { getDoc, getDocRawSource } from "$lib/registry/docs-catalog";
  import PageToc from "$lib/components/registry/page-toc.svelte";
  import PagePager from "$lib/components/registry/page-pager.svelte";
  import CopyPageButton from "$lib/components/registry/copy-page-button.svelte";

  let { data } = $props();
  let doc = $derived(getDoc(data.slug));
  let copyPageText = $derived(`# ${data.metadata.title}\n\n${getDocRawSource(data.slug) ?? ""}`);
</script>

{#if doc}
  <div class="mx-auto flex max-w-4xl gap-8 py-8">
    <div id="doc-content" class="flex min-w-0 flex-1 flex-col gap-8">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-3xl font-semibold tracking-tight">{data.metadata.title}</h1>
        <CopyPageButton text={copyPageText} />
      </div>
      <article class="prose dark:prose-invert max-w-none">
        <doc.Body />
      </article>
      <PagePager prev={data.prev} next={data.next} />
    </div>
    <PageToc containerId="doc-content" />
  </div>
{/if}
