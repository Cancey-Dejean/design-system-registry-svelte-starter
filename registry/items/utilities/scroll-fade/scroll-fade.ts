/**
 * Tailwind class helpers for scroll-edge fades.
 * Requires `@import "shadcn-svelte/tailwind.css"` in your global CSS
 * (ships with the `shadcn-svelte` package).
 *
 * Prefer writing utility class names as string literals in markup so Tailwind
 * can see them at build time.
 *
 * @see https://www.shadcn-svelte.com/docs/utils/scroll-fade
 */

/** Vertical scroller: fade top + bottom edges, scroll-aware. */
export const scrollFadeClass = "scroll-fade overflow-y-auto";

/** Alias for vertical scroll-fade. */
export const scrollFadeYClass = "scroll-fade-y overflow-y-auto";

/** Horizontal scroller: fade start + end edges (RTL-aware). */
export const scrollFadeXClass = "scroll-fade-x overflow-x-auto";

/** Physical / logical edge fades (scroll-aware). */
export const scrollFadeEdgeClasses = {
  top: "scroll-fade-t overflow-y-auto",
  bottom: "scroll-fade-b overflow-y-auto",
  left: "scroll-fade-l overflow-x-auto",
  right: "scroll-fade-r overflow-x-auto",
  /** Logical start (mirrors in RTL) */
  start: "scroll-fade-s overflow-x-auto",
  /** Logical end (mirrors in RTL) */
  end: "scroll-fade-e overflow-x-auto",
} as const;

/** Common fixed fade depths on the spacing scale. */
export const scrollFadeSizeClasses = {
  4: "scroll-fade-4",
  8: "scroll-fade-8",
  12: "scroll-fade-12",
  16: "scroll-fade-16",
  24: "scroll-fade-24",
} as const;

/** Disable the fade (works in any class order, useful for responsive cases). */
export const scrollFadeNoneClass = "scroll-fade-none";
