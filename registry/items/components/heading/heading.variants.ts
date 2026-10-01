import { tv } from "tailwind-variants";
import { cnConfig } from "$lib/utils.js";

export const headingCva = {
  variants: {
    level: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    },
    size: {
      "3xl": "text-60 sm:text-72",
      "2xl": "text-48 sm:text-60",
      xl: "text-36 sm:text-48",
      lg: "text-30 sm:text-36",
      md: "text-24 sm:text-30",
      sm: "text-20 sm:text-24",
      xs: "text-20",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      danger: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "semibold",
    tone: "default",
  },
} as const;

export const headingVariants = tv(
  {
    base: "font-semibold tracking-tight leading-none!",
    ...headingCva,
  },
  { twMergeConfig: cnConfig },
);

export const HEADING_LEVELS = Object.keys(
  headingCva.variants.level,
) as unknown as (keyof typeof headingCva.variants.level)[];

export const HEADING_SIZES = Object.keys(
  headingCva.variants.size,
) as (keyof typeof headingCva.variants.size)[];

export const HEADING_WEIGHTS = Object.keys(
  headingCva.variants.weight,
) as (keyof typeof headingCva.variants.weight)[];

export const HEADING_TONES = Object.keys(
  headingCva.variants.tone,
) as (keyof typeof headingCva.variants.tone)[];
