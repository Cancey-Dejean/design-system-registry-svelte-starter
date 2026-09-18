import { tv, type VariantProps } from "tailwind-variants";

export const emptyMediaVariants = tv({
  base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>["variant"];
