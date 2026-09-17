<script lang="ts">
  import { enhanceCodeBlocks } from "$lib/actions/enhance-code-blocks";

  let { html }: { html: string } = $props();
</script>

<div use:enhanceCodeBlocks class="text-sm [&_pre]:m-0">
  {@html html}
</div>
