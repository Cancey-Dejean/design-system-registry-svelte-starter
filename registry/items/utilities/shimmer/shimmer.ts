/**
 * Tailwind class helpers for text shimmer.
 * Requires `@import "shadcn-svelte/tailwind.css"` in your global CSS
 * (ships with the `shadcn-svelte` package).
 *
 * Prefer writing utility class names as string literals in markup so Tailwind
 * can see them at build time.
 *
 * @see https://www.shadcn-svelte.com/docs/utils/shimmer
 */

/** Continuous shimmer on text (uses currentColor). */
export const shimmerClass = "shimmer";

/** Play a single sweep instead of looping. */
export const shimmerOnceClass = "shimmer shimmer-once";

/** Reverse the sweep direction. */
export const shimmerReverseClass = "shimmer shimmer-reverse";

/** Disable shimmer and render solid text. */
export const shimmerNoneClass = "shimmer-none";

export const shimmerDurationClasses = {
  1000: "shimmer-duration-1000",
  1100: "shimmer-duration-1100",
  2000: "shimmer-duration-2000",
} as const;

export const shimmerSpreadClasses = {
  4: "shimmer-spread-4",
  12: "shimmer-spread-12",
  24: "shimmer-spread-24",
} as const;

export const shimmerAngleClasses = {
  20: "shimmer-angle-20",
  45: "shimmer-angle-45",
} as const;

export const shimmerColorClasses = {
  blue: "shimmer-color-blue-500/60",
  brand: "shimmer-color-[#ff3e00]",
} as const;
