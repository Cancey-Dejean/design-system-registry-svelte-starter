import { tv } from "tailwind-variants";

export const iconCva = {
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
} as const;

export const iconVariants = tv({
  base: "",
  ...iconCva,
});

export const ICON_SIZES = Object.keys(
  iconCva.variants.size,
) as (keyof typeof iconCva.variants.size)[];
