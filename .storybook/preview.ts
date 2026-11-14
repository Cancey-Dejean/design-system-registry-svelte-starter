import { withAccent, withStoryWrapper } from "../src/lib/components/utility/story-decorator";
import type { Preview } from "@storybook/sveltekit";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { withThemeByClassName } from "@storybook/addon-themes";
import "$registry/items/files/styles/globals.css";

const preview: Preview = {
  initialGlobals: { mode: "system", accent: "theme-primary" },
  globalTypes: {
    accent: {
      description: "Accent palette",
      toolbar: {
        title: "Palette",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "theme-primary", title: "Primary" },
          { value: "theme-secondary", title: "Secondary" },
          { value: "theme-tertiary", title: "Tertiary" },
        ],
      },
    },
  },
  parameters: {
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [],
      },
    },

    viewport: {
      options: INITIAL_VIEWPORTS,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    withStoryWrapper,
    withAccent,
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
