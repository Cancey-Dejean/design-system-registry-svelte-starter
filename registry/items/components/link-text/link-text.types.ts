import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import type { VariantProps } from "tailwind-variants";
import type { linkTextVariants } from "./link-text.variants";

type LinkTextVariantProps = VariantProps<typeof linkTextVariants>;

export type LinkTextTone = NonNullable<LinkTextVariantProps["tone"]>;
export type LinkTextUnderline = NonNullable<LinkTextVariantProps["underline"]>;
export type LinkTextSize = NonNullable<LinkTextVariantProps["size"]>;

export type LinkProps = HTMLAnchorAttributes & {
  as?: keyof HTMLElementTagNameMap | (string & {});
  tone?: LinkTextTone;
  underline?: LinkTextUnderline;
  size?: LinkTextSize;
  external?: boolean;
  ref?: HTMLAnchorElement | null;
  children?: Snippet;
};
