<script lang="ts">
  let { data } = $props();
</script>

<div class="mx-auto flex max-w-3xl flex-col gap-4 py-8">
  <h1 class="text-3xl font-semibold tracking-tight">Docs</h1>
  <ul class="flex flex-col gap-2">
    {#each data.docs as doc (doc.slug)}
      <li>
        <a href={`/docs/${doc.slug}`} class="text-primary underline-offset-4 hover:underline">
          {doc.metadata.title}
        </a>
        {#if doc.metadata.description}
          <p class="text-sm text-muted-foreground">{doc.metadata.description}</p>
        {/if}
      </li>
    {/each}
  </ul>
</div>
