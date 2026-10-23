<script lang="ts">
  import { DotCanvas } from "$registry/items/utilities/dot-canvas/index.js";
  import { cn } from "$lib/utils";

  let { name, title, section, stacked = false }: {
    name: string; title: string; section: "components" | "blocks"; stacked?: boolean;
  } = $props();
  let frame: HTMLIFrameElement | undefined;
  let timer: ReturnType<typeof setTimeout>;
  let shouldLoad = $state(false);
  let ready = $state(false);
  let failed = $state(false);
  let width = $state(360);
  const canvasWidth = $derived(section === "components" ? 720 : 1440);
  const canvasHeight = $derived(section === "components" ? 450 : 900);

  function syncTheme() {
    const root = frame?.contentDocument?.documentElement;
    if (!root) return;
    root.classList.toggle("dark", document.documentElement.classList.contains("dark"));
    for (const attribute of ["data-accent", "data-theme"]) {
      const value = document.documentElement.getAttribute(attribute);
      if (value) root.setAttribute(attribute, value);
      else root.removeAttribute(attribute);
    }
  }

  function observeContainer(container: HTMLDivElement) {
    const intersection = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        shouldLoad = true; intersection.disconnect();
        timer = setTimeout(() => { if (!ready) failed = true; }, 20000);
      }
    }, { rootMargin: "200px" });
    intersection.observe(container);
    const resize = new ResizeObserver(([entry]) => { width = entry.contentRect.width; });
    resize.observe(container);
    const theme = new MutationObserver(syncTheme);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-accent", "data-theme"] });
    return () => { intersection.disconnect(); resize.disconnect(); theme.disconnect(); clearTimeout(timer); };
  }

  function handleMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin || event.source !== frame?.contentWindow || event.data?.name !== name) return;
    if (event.data.type === "registry-preview-ready") { ready = true; failed = false; clearTimeout(timer); }
    if (event.data.type === "registry-preview-error") { failed = true; clearTimeout(timer); }
  }

  function connectFrame(element: HTMLIFrameElement) {
    frame = element;
    return () => { frame = undefined; };
  }

</script>

<svelte:window onmessage={handleMessage} />
<div {@attach observeContainer} class={cn("pointer-events-none relative aspect-[8/5] overflow-hidden rounded-lg border bg-muted/20", stacked && "order-2")} aria-hidden="true" inert>
  <DotCanvas class="mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]" />
  {#if !ready}
    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background p-8">
      <div class="h-4 w-2/3 rounded bg-muted motion-safe:animate-pulse"></div>
      <div class="h-20 w-full max-w-xs rounded bg-muted motion-safe:animate-pulse"></div>
      <span class="text-xs text-muted-foreground">{failed ? "Preview unavailable. Open details to explore." : "Loading preview…"}</span>
    </div>
  {/if}
  {#if shouldLoad}
    <iframe {@attach connectFrame} title={`${title} preview`} tabindex="-1" src={`/${section === "components" ? "component-preview" : "block-preview"}/${name}`} onload={syncTheme} class="absolute top-0 left-0 origin-top-left border-0" style={`width:${canvasWidth}px;height:${canvasHeight}px;transform:scale(${width / canvasWidth})`}></iframe>
  {/if}
</div>
