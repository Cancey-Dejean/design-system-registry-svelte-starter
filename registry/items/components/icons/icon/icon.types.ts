import type { IconKey } from "../icons.js";
import type { VariantProps } from "tailwind-variants";
import type { iconVariants } from "./icon.variants.js";

export type IconSize = VariantProps<typeof iconVariants>["size"];

export type IconProps = {
  icon: IconKey;
  size?: IconSize;
  class?: string;
};
