<script lang="ts">
  import { IsMobile } from "./is-mobile.svelte.js";
  const mobile = new IsMobile();
</script>

<div class="rounded-lg border p-6 text-sm">
  <p class="font-medium">{mobile.current ? "Mobile layout" : "Desktop layout"}</p>
  <p class="mt-2 text-muted-foreground">Resize the window across 768px to update the viewport state.</p>
</div>
