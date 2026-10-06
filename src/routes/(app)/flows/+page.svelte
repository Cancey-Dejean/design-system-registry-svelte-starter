<script lang="ts">
  import FlowsPage from "$lib/components/flows/flows-page.svelte";
  import { createRegistryFlowGraph } from "$lib/registry/flow-graph";
  import { flowsPage } from "$lib/navigation";

  let { data } = $props();

  let graph = $derived(createRegistryFlowGraph(data.items));
</script>

<svelte:head>
  <title>{flowsPage.title}</title>
  <meta name="description" content={flowsPage.description} />
</svelte:head>

<FlowsPage {graph} title={flowsPage.title} description={flowsPage.description} />
