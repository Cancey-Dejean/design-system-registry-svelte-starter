<script lang="ts">
  import RegistryItemList from "$lib/components/registry/registry-item-list.svelte";

  let { data } = $props();
</script>

<RegistryItemList title="Blocks" items={data.items} basePath="/blocks" />
