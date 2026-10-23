<script lang="ts">
  import AuthoredDocPage from "$lib/components/registry/authored-doc-page.svelte";
  let { data } = $props();
</script>
<AuthoredDocPage {data} />
