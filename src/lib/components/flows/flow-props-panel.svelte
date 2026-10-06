<script lang="ts">
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import SearchIcon from "@lucide/svelte/icons/search";
  import TableIcon from "@lucide/svelte/icons/table";

  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { Button } from "$registry/items/components/button/index.js";
  import * as Collapsible from "$registry/items/components/collapsible/index.js";
  import * as Table from "$registry/items/components/table/index.js";
  import type { RegistryFlowItem } from "$lib/registry/flow-data";
  import { cn } from "$lib/utils";

  import { flowSidebarScrollClassName } from "./flow-canvas";

  const MAX_VISIBLE_OPTIONS = 8;

  let { item, previewing }: { item: RegistryFlowItem; previewing: boolean } = $props();

  let query = $state("");

  let component = $derived(item.api.component);
  let variants = $derived(item.api.variants);
  let ownProps = $derived(item.api.props);
  let isEmpty = $derived(variants.length === 0 && ownProps.length === 0);
  let rows = $derived([
    ...variants.map((variant) => ({
      name: variant.name,
      optional: true,
      type: variant.options.map((option) => `"${option}"`).join(" | "),
      defaultValue: variant.defaultValue === undefined ? undefined : `"${variant.defaultValue}"`,
    })),
    ...ownProps,
  ]);
  let normalizedQuery = $derived(query.trim().toLowerCase());
  let visibleRows = $derived(
    normalizedQuery ? rows.filter((row) => row.name.toLowerCase().includes(normalizedQuery)) : rows,
  );
  let countLabel = $derived(
    [
      variants.length > 0 ? `${variants.length} ${variants.length === 1 ? "variant" : "variants"}` : "",
      ownProps.length > 0 ? `${ownProps.length} ${ownProps.length === 1 ? "prop" : "props"}` : "",
    ]
      .filter(Boolean)
      .join(" · "),
  );
</script>

{#snippet heading()}
  <h3 class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Props</h3>
  {#if component}
    <code class="truncate font-mono text-[11px] text-foreground">{`<${component}>`}</code>
  {/if}
{/snippet}

{#snippet columns()}
  <colgroup>
    <col class="w-48" />
    <col />
    <col class="w-36" />
  </colgroup>
{/snippet}

{#if isEmpty}
  <section class="flex flex-col gap-2">
    <div class="flex items-baseline gap-2">{@render heading()}</div>
    <p class="rounded-lg border border-dashed px-3 py-2.5 text-xs text-muted-foreground">
      No variants or own props found for {item.title}.
    </p>
  </section>
{:else}
  <Collapsible.Root open class="flex flex-col">
    <Collapsible.Trigger
      class="group/props -mx-2 flex items-center gap-2 rounded-md px-2 py-1 text-left outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ChevronRightIcon
        aria-hidden="true"
        class="size-3 shrink-0 text-muted-foreground transition-transform duration-150 group-data-[state=open]/props:rotate-90"
        strokeWidth={1.75}
      />
      {@render heading()}
      <span class="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
        {previewing ? `previewing ${item.title}` : countLabel}
      </span>
    </Collapsible.Trigger>

    <Collapsible.Content class="pt-2">
      <div class="flex flex-col divide-y overflow-hidden rounded-lg border bg-card">
        {#each variants as variant (variant.name)}
          {@const visible = variant.options.slice(0, MAX_VISIBLE_OPTIONS)}
          {@const hidden = variant.options.length - visible.length}
          <div class="flex flex-col gap-1.5 px-3 py-2.5">
            <div class="flex items-baseline justify-between gap-2 font-mono text-[11.5px]">
              <span class="font-medium">{variant.name}</span>
              {#if variant.defaultValue !== undefined}
                <span class="text-muted-foreground">default: {variant.defaultValue}</span>
              {/if}
            </div>
            <ul class="flex flex-wrap gap-1" aria-label="{variant.name} options">
              {#each visible as option (option)}
                <li
                  class={cn(
                    "rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
                    option === variant.defaultValue &&
                      "border-foreground/40 bg-muted text-foreground",
                  )}
                >
                  {option}
                </li>
              {/each}
              {#if hidden > 0}
                <li class="px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
                  +{hidden} more
                </li>
              {/if}
            </ul>
          </div>
        {/each}
        {#if ownProps.length > 0}
          <div class="flex flex-col gap-1.5 px-3 py-2.5">
            <span class="font-mono text-[11.5px] font-medium">props</span>
            <ul class="flex flex-wrap gap-1" aria-label="Own props">
              {#each ownProps as prop (prop.name)}
                <li class="rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                  {prop.name}{#if prop.optional}<span class="text-muted-foreground">?</span>{/if}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <Dialog.Root
        onOpenChange={(open) => {
          if (!open) {
            query = "";
          }
        }}
      >
        <Dialog.Trigger>
          {#snippet child({ props: triggerProps })}
            <Button {...triggerProps} size="sm" class="mt-2 h-7 gap-1.5 self-start px-2.5 text-xs">
              <TableIcon data-icon="inline-start" class="size-3.5!" />
              Detailed list
            </Button>
          {/snippet}
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-2xl">
          <Dialog.Header>
            <Dialog.Title class="font-mono">{`<${component ?? item.title}>`} props</Dialog.Title>
            <Dialog.Description>
              Every variant and prop {item.title} declares, with its type and default value.
            </Dialog.Description>
          </Dialog.Header>
          <InputGroup.Root>
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
            <InputGroup.Input
              bind:value={query}
              placeholder="Search props…"
              aria-label="Search props by name"
            />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Text aria-live="polite" class="font-mono text-xs tabular-nums">
                {visibleRows.length}/{rows.length}
              </InputGroup.Text>
            </InputGroup.Addon>
          </InputGroup.Root>
          <div class="overflow-hidden rounded-lg border">
            <Table.Root class="table-fixed font-mono text-xs">
              {@render columns()}
              <Table.Header>
                <Table.Row>
                  <Table.Head>Prop</Table.Head>
                  <Table.Head>Type</Table.Head>
                  <Table.Head>Default</Table.Head>
                </Table.Row>
              </Table.Header>
            </Table.Root>
            <div class={cn("max-h-[50svh] overflow-y-auto", flowSidebarScrollClassName)}>
              <Table.Root class="table-fixed font-mono text-xs">
                {@render columns()}
                <Table.Body>
                  {#if visibleRows.length === 0}
                    <Table.Row class="hover:bg-transparent">
                      <Table.Cell
                        colspan={3}
                        class="py-6 text-center font-sans text-muted-foreground"
                      >
                        No props match “{query.trim()}”.
                      </Table.Cell>
                    </Table.Row>
                  {/if}
                  {#each visibleRows as row (row.name)}
                    <Table.Row>
                      <Table.Cell class="align-top font-medium">
                        {row.name}{#if row.optional}<span class="text-muted-foreground">?</span
                          >{:else}<span
                            class="ml-1.5 font-sans text-[10px] text-muted-foreground uppercase"
                            >required</span
                          >{/if}
                      </Table.Cell>
                      <Table.Cell
                        class="align-top break-words whitespace-normal text-muted-foreground"
                      >
                        {row.type}
                      </Table.Cell>
                      <Table.Cell class="align-top break-words whitespace-normal">
                        {#if row.defaultValue === undefined}
                          <span class="text-muted-foreground">—</span>
                        {:else}
                          {row.defaultValue}
                        {/if}
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </Collapsible.Content>
  </Collapsible.Root>
{/if}
