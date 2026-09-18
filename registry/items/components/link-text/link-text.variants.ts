import { tv } from "tailwind-variants";

export const linkTextCva = {
  variants: {
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      danger: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
    underline: {
      none: "no-underline",
      hover: "no-underline hover:underline",
      always: "underline",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    tone: "default",
    underline: "hover",
    size: "md",
  },
} as const;

export const linkTextVariants = tv({
  base: "inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  ...linkTextCva,
});

export const LINK_TEXT_SIZES = Object.keys(
  linkTextCva.variants.size,
) as (keyof typeof linkTextCva.variants.size)[];

export const LINK_TEXT_TONES = Object.keys(
  linkTextCva.variants.tone,
) as (keyof typeof linkTextCva.variants.tone)[];

export const LINK_TEXT_UNDERLINES = Object.keys(
  linkTextCva.variants.underline,
) as (keyof typeof linkTextCva.variants.underline)[];
