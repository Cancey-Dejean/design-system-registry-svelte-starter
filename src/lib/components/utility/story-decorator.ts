import type { Decorator } from "@storybook/svelte";
import StoryWrapper from "./story-wrapper.svelte";

export const withStoryWrapper: Decorator = (story, context) =>
  context.parameters.centered ? { Component: StoryWrapper } : story();

/** Palette that uses the base tokens in theme.css, i.e. no `data-theme` attribute. */
const DEFAULT_ACCENT = "theme-primary";

/**
 * Applies the toolbar's `accent` global as `data-theme` on <html>, which is what
 * theme-secondary.css / theme-tertiary.css select on. It sits on the same element as
 * the light/dark class from withThemeByClassName, so `.dark[data-theme=…]` matches too.
 */
export const withAccent: Decorator = (story, context) => {
  const accent = context.globals.accent as string | undefined;
  const root = document.documentElement;
  if (!accent || accent === DEFAULT_ACCENT) delete root.dataset.theme;
  else root.dataset.theme = accent;
  return story();
};
