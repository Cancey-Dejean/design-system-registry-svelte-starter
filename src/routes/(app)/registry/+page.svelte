<script lang="ts">
  let { data } = $props();
</script>

<div class="mx-auto flex max-w-3xl flex-col gap-8 py-8">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-semibold tracking-tight">Registry</h1>
    <p class="text-muted-foreground">
      Every page on this site, in one flat index. See
      <a href="/docs/registry" class="underline underline-offset-4">Registry</a> for how to install
      any item via the shadcn-svelte CLI.
    </p>
  </div>

  <section class="flex flex-col gap-3">
    <h2 class="text-lg font-semibold">Docs</h2>
    <ul class="flex flex-col gap-2">
      {#each data.docs as doc (doc.url)}
        <li>
          <a href={doc.url} class="text-primary underline-offset-4 hover:underline">{doc.title}</a>
          {#if doc.description}
            <p class="text-sm text-muted-foreground">{doc.description}</p>
          {/if}
        </li>
      {/each}
    </ul>
  </section>

  {#each data.sections as section (section.id)}
    <section class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold">{section.title}</h2>
      <ul class="flex flex-col gap-2">
        {#each section.items as item (item.url)}
          <li>
            <a href={item.url} class="text-primary underline-offset-4 hover:underline"
              >{item.title}</a
            >
            {#if item.description}
              <p class="text-sm text-muted-foreground">{item.description}</p>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</div>
