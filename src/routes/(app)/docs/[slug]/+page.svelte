<script lang="ts">
  import { getDoc } from "$lib/registry/docs-catalog";

  let { data } = $props();
  let doc = $derived(getDoc(data.slug));
</script>

{#if doc}
  <article class="prose dark:prose-invert mx-auto max-w-3xl py-8">
    <doc.Body />
  </article>
{/if}
