import { tv, type VariantProps } from "tailwind-variants";

export const itemVariants = tv({
  base: "rounded-lg border text-sm [a]:hover:bg-muted group/item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
  variants: {
    variant: {
      default: "border-transparent",
      outline: "border-border",
      muted: "border-transparent bg-muted/50",
    },
    size: {
      default: "gap-2.5 px-3 py-2.5",
      sm: "gap-2.5 px-3 py-2.5",
      xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ItemSize = VariantProps<typeof itemVariants>["size"];
export type ItemVariant = VariantProps<typeof itemVariants>["variant"];
