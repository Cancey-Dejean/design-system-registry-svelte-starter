import { tv, type VariantProps } from "tailwind-variants";

export const codeBlockLineCva = {
  base: "-mx-4 px-4 in-data-numbered:gap-x-3 before:min-w-6 before:text-end before:text-muted-foreground after:start-1 after:text-muted-foreground group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3 relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  variants: {
    variant: {
      default: "",
      added: "bg-muted after:content-['+']",
      removed: "bg-destructive/10 after:text-destructive after:content-['−']",
      highlighted: "bg-muted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
} as const;

export const codeBlockLineVariants = tv(codeBlockLineCva);
export const CODE_BLOCK_LINE_VARIANTS = Object.keys(
  codeBlockLineCva.variants.variant,
) as (keyof typeof codeBlockLineCva.variants.variant)[];

export type CodeBlockLineVariant = VariantProps<typeof codeBlockLineVariants>["variant"];

// One highlighted token, such as one returned by `useHighlightedCode`.
export type CodeBlockLineToken = {
  content: string;
  style?: string;
  class?: string;
};
