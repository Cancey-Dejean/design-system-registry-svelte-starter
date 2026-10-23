<script lang="ts">
  import DotCanvas from "./dot-canvas.svelte";
</script>

<div class="relative h-40 w-full max-w-md overflow-hidden rounded-xl border">
  <DotCanvas />
  <p class="relative z-10 p-6 text-sm text-muted-foreground">Content sits above the dots.</p>
</div>
