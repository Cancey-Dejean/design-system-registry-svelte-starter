import type { Decorator } from "@storybook/svelte";
import StoryWrapper from "./story-wrapper.svelte";

export const withStoryWrapper: Decorator = (story, context) =>
  context.parameters.centered ? { Component: StoryWrapper } : story();
