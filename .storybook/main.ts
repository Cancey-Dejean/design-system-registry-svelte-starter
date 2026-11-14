import type { StorybookConfig } from "@storybook/sveltekit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

type ViteFinalConfig = Parameters<NonNullable<StorybookConfig["viteFinal"]>>[0];
type VitePlugin = Extract<NonNullable<ViteFinalConfig["plugins"]>[number], { name: string }>;

/**
 * SvelteKit 3's dev server adds a catch-all middleware that renders its error page
 * server-side for any URL it doesn't recognise (e.g. the browser's /favicon.ico request).
 * That page imports `$app/state`, which @storybook/sveltekit aliases to a browser-only
 * mock, so the SSR render throws `__STORYBOOK_MODULE_TEST__ is not defined` and Vite
 * broadcasts the error overlay into every open story.
 *
 * Storybook never needs SvelteKit's routing, so answer unknown non-file URLs with a 404
 * before they reach SvelteKit. Real files still fall through and are served as before.
 */
const blockSvelteKitFallback: VitePlugin = {
  name: "storybook:block-sveltekit-fallback",
  enforce: "pre",
  configureServer(server) {
    // Returning a function registers this after Vite's internal middlewares but,
    // thanks to `enforce: "pre"`, before SvelteKit's own post-middleware catch-all.
    return () => {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURI((req.url ?? "/").split("?")[0]);
        const file = path.join(server.config.root, pathname);
        if (fs.existsSync(file) && fs.statSync(file).isFile()) return next();
        res.statusCode = 404;
        res.end();
      });
    };
  },
};

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)",
    "../registry/**/*.stories.@(js|ts|svelte)",
  ],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-links",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/sveltekit",
  async viteFinal(viteConfig) {
    viteConfig.server ??= {};
    viteConfig.server.fs ??= {};
    viteConfig.server.fs.allow = [
      ...(viteConfig.server.fs.allow ?? []),
      path.resolve(dirname, "..", "registry"),
    ];
    viteConfig.plugins = [blockSvelteKitFallback, ...(viteConfig.plugins ?? [])];
    return viteConfig;
  },
};
export default config;
