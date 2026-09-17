<script lang="ts">
  import ItemDocPage from "$lib/components/registry/item-doc-page.svelte";

  let { data } = $props();
</script>

<ItemDocPage
  section={data.section}
  name={data.name}
  metadata={data.metadata}
  previewSourceHtml={data.previewSourceHtml}
  prev={data.prev}
  next={data.next}
/>
