<script lang="ts">
  import RegistryGallery from "$lib/components/registry/registry-gallery.svelte";
  let { data } = $props();
</script>
<RegistryGallery items={data.items} section="components" />
