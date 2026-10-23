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

Keep `esrap` in `devDependencies`: the Svelte compiler requires its `languages/ts` export.
Storybook also uses an older version, so relying on the transitive dependency alone can resolve
that older package during cached Vercel installs and fail both builds with
`ERR_PACKAGE_PATH_NOT_EXPORTED`. Update `package.json` and `bun.lock` together when changing it.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Dependency updates

Use Node 24.11 or newer within Node 24 and install from the committed `bun.lock`.
Vite+ and its Vite alias, Vitest, browser provider, and coverage provider must be updated together;
run the target version's `vp migrate` rather than changing only a runner pin.

TypeScript stays on 6.x because SvelteKit sync and svelte-check require its JavaScript compiler
API. [TypeScript 7 currently omits that API](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), so Dependabot defers its major updates until the
Svelte integrations support it. This does not disable TypeScript security updates.

The `source-map-js` and `postcss-selector-parser` overrides enforce the patched releases for
transitive dependencies. Remove them only after all parent packages require patched versions.

Validate dependency updates with `bun audit`, `vp check`, `vp run check`, `vp test --run`,
`vp run build`, and `vp run build-storybook`.
