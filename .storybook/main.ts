import type { StorybookConfig } from "@storybook/sveltekit";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)",
    "../registry/**/*.stories.@(js|ts|svelte)",
  ],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/sveltekit",
  async viteFinal(viteConfig) {
    viteConfig.server ??= {};
    viteConfig.server.fs ??= {};
    viteConfig.server.fs.allow = [
      ...(viteConfig.server.fs.allow ?? []),
      path.resolve(dirname, "..", "registry"),
    ];
    return viteConfig;
  },
};
export default config;
