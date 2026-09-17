<script lang="ts">
  import RegistryItemList from "$lib/components/registry/registry-item-list.svelte";

  let { data } = $props();
</script>

<div class="flex flex-col gap-4 py-8 grow">
  <h1 class="text-3xl font-semibold tracking-tight">Components</h1>
  <RegistryItemList items={data.items} basePath="/components" />
</div>
