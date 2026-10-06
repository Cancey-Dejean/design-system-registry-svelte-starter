import { describe, expect, test } from "vite-plus/test";

import { getRegistryItemApi } from "./flow-props";

const variants = {
  path: "registry/items/components/chip/chip.variants.ts",
  code: `
    import { tv } from "tailwind-variants";

    export const chipCva = {
      variants: {
        variant: { solid: "a", outline: "b" },
        size: { sm: "a", md: "b", lg: "c" },
      },
      defaultVariants: { variant: "solid", size: "md" },
    } as const;

    export const chipVariants = tv({ base: "chip", ...chipCva });
  `,
};

describe("getRegistryItemApi", () => {
  test("reads variants and own props from the main component", () => {
    const api = getRegistryItemApi({
      name: "chip",
      files: [
        variants,
        {
          path: "registry/items/components/chip/chip.types.ts",
          code: `
            import type { HTMLAttributes } from "svelte/elements";

            export type ChipSize = VariantProps<typeof chipVariants>["size"];
            export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
              variant?: ChipVariant;
              size?: ChipSize;
              align?: "start" | "end";
              label: string;
              removable?: boolean;
              ref?: HTMLSpanElement | null;
            };
          `,
        },
        {
          path: "registry/items/components/chip/chip-close.svelte",
          code: `<script lang="ts">let { other }: { other?: string } = $props();</script>`,
        },
        {
          path: "registry/items/components/chip/chip.svelte",
          code: `
            <script lang="ts">
              import type { ChipProps } from "./chip.types";

              let {
                class: className,
                variant,
                size = "lg",
                align = "start",
                label,
                removable = $bindable(false),
                ref = $bindable(null),
                ...restProps
              }: ChipProps = $props();
            </script>

            <span bind:this={ref} class={className} {...restProps}>{label}</span>
          `,
        },
      ],
    });

    expect(api).toEqual({
      component: "Chip",
      variants: [
        { name: "variant", options: ["solid", "outline"], defaultValue: "solid" },
        { name: "size", options: ["sm", "md", "lg"], defaultValue: "lg" },
        { name: "align", options: ["start", "end"], defaultValue: "start" },
      ],
      props: [
        { name: "label", type: "string", optional: false },
        { name: "removable", type: "boolean", optional: true, defaultValue: "false" },
      ],
    });
  });

  test("expands VariantProps into every tv variant", () => {
    const api = getRegistryItemApi({
      name: "chip",
      files: [
        variants,
        {
          path: "registry/items/components/chip/chip.svelte",
          code: `<script lang="ts">
            let { variant, ...rest }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof chipVariants> = $props();
          </script>`,
        },
      ],
    });

    expect(api.variants.map((variant) => variant.name)).toEqual(["variant", "size"]);
    expect(api.props).toEqual([]);
  });

  test("falls back to tv variants when the item has no component", () => {
    expect(getRegistryItemApi({ name: "chip", files: [variants] })).toEqual({
      variants: [
        { name: "variant", options: ["solid", "outline"], defaultValue: "solid" },
        { name: "size", options: ["sm", "md", "lg"], defaultValue: "md" },
      ],
      props: [],
    });
  });

  test("returns an empty API for items without sources or own props", () => {
    expect(getRegistryItemApi({ name: "styles", files: [] })).toEqual({ variants: [], props: [] });
    expect(
      getRegistryItemApi({
        name: "box",
        files: [
          {
            path: "registry/items/components/box/box.svelte",
            code: `<script lang="ts">let { ...rest }: HTMLAttributes<HTMLDivElement> = $props();</script>`,
          },
        ],
      }),
    ).toEqual({ component: "Box", variants: [], props: [] });
  });
});
