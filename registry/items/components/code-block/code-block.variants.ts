import { tv, type VariantProps } from "tailwind-variants";

export const codeBlockCva = {
  base: "rounded-lg text-sm data-[size=sm]:text-xs has-[>[data-slot=code-block-content]:focus-visible]:ring-3 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/50 group/code-block relative flex w-full min-w-0 flex-col overflow-hidden",
  variants: {
    variant: {
      default:
        "border border-input text-foreground dark:bg-input/30 has-[>[data-slot=code-block-content]:focus-visible]:border-ring",
      destructive: "border border-destructive/30 text-destructive dark:border-destructive/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
} as const;

export const codeBlockVariants = tv(codeBlockCva);
export const CODE_BLOCK_VARIANTS = Object.keys(
  codeBlockCva.variants.variant,
) as (keyof typeof codeBlockCva.variants.variant)[];

export type CodeBlockVariant = VariantProps<typeof codeBlockVariants>["variant"];
export type CodeBlockSize = "default" | "sm";
