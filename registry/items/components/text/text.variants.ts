import { tv } from "tailwind-variants";
import { cnConfig } from "$lib/utils.js";

export const textCva = {
  variants: {
    size: {
      xs: "text-12 sm:text-14",
      sm: "text-14 sm:text-16",
      md: "text-16 sm:text-18",
      lg: "text-18 sm:text-20",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      danger: "text-destructive",
      success: "text-green-600",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    tone: "default",
    align: "left",
  },
} as const;

export const textVariants = tv(
  {
    base: "tracking-tight",
    ...textCva,
  },
  { twMergeConfig: cnConfig },
);

export const TEXT_SIZES = Object.keys(
  textCva.variants.size,
) as (keyof typeof textCva.variants.size)[];

export const TEXT_ALIGNMENTS = Object.keys(
  textCva.variants.align,
) as (keyof typeof textCva.variants.align)[];

export const TEXT_WEIGHTS = Object.keys(
  textCva.variants.weight,
) as (keyof typeof textCva.variants.weight)[];

export const TEXT_TONES = Object.keys(
  textCva.variants.tone,
) as (keyof typeof textCva.variants.tone)[];
