<script lang="ts">
  let { html }: { html: string } = $props();
</script>

<div class="overflow-x-auto rounded-md border text-sm [&_pre]:p-4 [&_pre]:leading-relaxed">
  {@html html}
</div>
