<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import FileIcon from "@lucide/svelte/icons/file";
  import { enhanceCodeBlocks } from "$lib/actions/enhance-code-blocks";

  let {
    html,
    filename,
    code,
  }: {
    html: string;
    filename?: string;
    code?: string;
  } = $props();

  let copied = $state(false);

  async function copy() {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div
  use:enhanceCodeBlocks
  class={[
    "text-sm [&_pre]:m-0",
    filename &&
      "overflow-hidden rounded-lg border [&_.code-copy-button]:hidden [&_pre.shiki]:max-h-96 [&_pre.shiki]:rounded-none [&_pre.shiki]:border-0",
  ]}
>
  {#if filename}
    <div
      class="flex items-center justify-between gap-2 border-b bg-muted/50 px-3 py-2"
    >
      <span
        class="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground"
      >
        <FileIcon class="size-3.5 shrink-0" />
        <span class="truncate">{filename}</span>
      </span>
      {#if code}
        <button
          type="button"
          class="text-muted-foreground hover:text-foreground shrink-0"
          onclick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {#if copied}
            <CheckIcon class="size-3.5" />
          {:else}
            <CopyIcon class="size-3.5" />
          {/if}
        </button>
      {/if}
    </div>
  {/if}
  {@html html}
</div>
