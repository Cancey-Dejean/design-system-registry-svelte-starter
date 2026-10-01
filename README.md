# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Type scale

Font sizes live in `registry/items/files/styles/theme.css` as `--text-10` through `--text-120`. Tailwind exposes each token as a utility (`text-60` comes from `--text-60`). Heading and Text use that scale, and each size steps up at the `sm` breakpoint. The consumer-facing table is in [`registry/docs/styles.svx`](registry/docs/styles.svx).

`cn` and `tailwind-variants` treat an unknown `text-*` class as a text color. Merging `text-60` with `text-foreground` drops `text-60`, so the heading renders at the inherited size. `registry/items/lib/utils.ts` registers the scale as font sizes (`themeTextSizes`, `cnConfig`), and `src/lib/utils.ts` re-exports that `cn`. Any `tv()` recipe that pairs a scale size with a color passes the config through:

```ts
import { tv } from "tailwind-variants";
import { cnConfig } from "$lib/utils.js";

tv(recipe, { twMergeConfig: cnConfig });
```

Add a new size in `theme.css` and under `themeTextSizes`. `themeTextSizes` also lists semantic aliases (`label`, `meta`, `body`, `heading`, `title`, `display`, `display-xl`) so those class names survive a merge. They become real utilities once matching `--text-*` tokens exist in the theme.

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.0 create --template minimal --types ts --add tailwindcss="plugins:typography" storybook ai-tools="ide:claude-code,cursor+delivery:plugin+tools:mcp,svelte-code-writer,svelte-core-bestpractices,svelte-file-editor+mcpSetup:remote" --no-install ./
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
