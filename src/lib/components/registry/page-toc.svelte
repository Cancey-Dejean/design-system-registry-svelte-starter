<script lang="ts">
  import type { HeadingEntry } from "$lib/registry/extract-headings";
  import { cn } from "$lib/utils";

  let { items }: { items: HeadingEntry[] } = $props();

  let activeId = $state<string | null>(null);

  // Matches the sticky header height (top-24) plus a little breathing room,
  // so a heading counts as "current" once it scrolls just past the header.
  const ACTIVE_OFFSET = 104;

  $effect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) {
      activeId = null;
      return;
    }

    let ticking = false;
    function updateActive() {
      ticking = false;
      let current = headings[0].id;
      const atBottom =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      for (const heading of headings) {
        // Short final sections cannot always reach the header before scrolling stops.
        if (heading.getBoundingClientRect().top <= ACTIVE_OFFSET || atBottom) {
          current = heading.id;
        }
      }
      activeId = current;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

{#if items.length}
  <nav class="hidden w-48 shrink-0 xl:block">
    <div class="sticky top-24 flex max-h-[calc(100dvh-8rem)] flex-col gap-3">
      <p class="text-sm font-medium">On This Page</p>
      <ul class="no-scrollbar scroll-fade flex min-h-0 flex-col gap-2 overflow-y-auto text-sm">
        {#each items as item (item.id)}
          {@const isActive = item.id === activeId}
          <li>
            <a
              href={`#${item.id}`}
              onclick={() => (activeId = item.id)}
              aria-current={isActive ? "location" : undefined}
              class={cn(
                "block border-l-2 py-0.5 pl-3 transition-colors",
                isActive
                  ? "border-foreground font-medium text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
{/if}
