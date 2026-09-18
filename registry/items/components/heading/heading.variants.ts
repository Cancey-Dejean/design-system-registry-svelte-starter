import { tv } from "tailwind-variants";

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
      xs: "[font-size:var(--text-20)]",
      sm: "[font-size:var(--text-20)] sm:[font-size:var(--text-24)]",
      md: "[font-size:var(--text-24)] sm:[font-size:var(--text-30)]",
      lg: "[font-size:var(--text-30)] sm:[font-size:var(--text-36)]",
      xl: "[font-size:var(--text-36)] sm:[font-size:var(--text-48)]",
      "2xl": "[font-size:var(--text-48)] sm:[font-size:var(--text-60)]",
      "3xl": "[font-size:var(--text-60)] sm:[font-size:var(--text-72)]",
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

export const headingVariants = tv({
  base: "font-semibold tracking-tight leading-none!",
  ...headingCva,
});

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
