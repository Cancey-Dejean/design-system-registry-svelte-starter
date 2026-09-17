/// <reference types="vite-plus" />
import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypeSlug from "rehype-slug";
import { defineConfig, lazyPlugins } from "vite-plus";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "vite-plus/test/browser-playwright";
import { highlightCode } from "./src/lib/shiki";

// mdsvex splices a custom highlighter's return value directly into the compiled
// Svelte markup, so raw `{`/`}`/`` ` `` in the highlighted HTML (e.g. from a JSON
// sample) must be escaped and the whole block wrapped in `{@html \`...\`}`.
const escapeSvelty = (str: string) =>
  str.replace(/[{}`]/g, (c) => ({ "{": "&#123;", "}": "&#125;", "`": "&#96;" })[c] ?? c);

const mdsvexOptions = {
  extensions: [".svx"],
  rehypePlugins: [rehypeSlug],
  highlight: {
    highlighter: async (code: string, lang?: string | null) =>
      `{@html \`${escapeSvelty(await highlightCode(code, lang ?? ""))}\`}`,
  },
};
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  server: {
    fs: {
      allow: [path.resolve(dirname, "registry")],
    },
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [
    tailwindcss(),
    sveltekit({
      extensions: [".svelte", ".svx"],
      preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
      alias: {
        $registry: "registry",
      },
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      adapter: adapter(),
    }),
  ]),
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
