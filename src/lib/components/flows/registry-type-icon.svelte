<script lang="ts">
  import type { ComponentProps } from "svelte";

  import type { RegistryItemType } from "$lib/registry/item-types";

  import { getRegistryTypeIcon, type FlowIcon } from "./flow-nodes";

  let { type, ...restProps }: ComponentProps<FlowIcon> & { type: RegistryItemType } = $props();

  let Icon = $derived(getRegistryTypeIcon(type));
</script>

<Icon {...restProps} />
