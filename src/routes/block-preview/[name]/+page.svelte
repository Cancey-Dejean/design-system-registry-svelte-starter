<script lang="ts">
  import IsolatedPreview from "$lib/components/registry/isolated-preview.svelte";
  let { data } = $props();
</script>
{#key data.name}<IsolatedPreview section="blocks" name={data.name} />{/key}
