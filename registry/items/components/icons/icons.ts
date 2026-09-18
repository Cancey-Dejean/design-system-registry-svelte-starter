import Aperture from "@lucide/svelte/icons/aperture";
import ArrowLeft from "@lucide/svelte/icons/arrow-left";
import ArrowRight from "@lucide/svelte/icons/arrow-right";
import Check from "@lucide/svelte/icons/check";
import ChevronLeft from "@lucide/svelte/icons/chevron-left";
import ChevronRight from "@lucide/svelte/icons/chevron-right";
import Eye from "@lucide/svelte/icons/eye";
import Feather from "@lucide/svelte/icons/feather";
import Glasses from "@lucide/svelte/icons/glasses";
import Layers from "@lucide/svelte/icons/layers";
import PlayCircle from "@lucide/svelte/icons/play-circle";
import Search from "@lucide/svelte/icons/search";
import ShieldCheck from "@lucide/svelte/icons/shield-check";
import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
import Sun from "@lucide/svelte/icons/sun";
import User from "@lucide/svelte/icons/user";
import type { Component } from "svelte";

import NavArrow from "./icon-set/nav-arrow.svelte";
import XCircleSolid from "./icon-set/x-circle-solid.svelte";

// Lucide + custom SVGs share a loose render contract (class + SVG attrs).
// A strict LucideProps intersection becomes unrepresentable for a mixed registry.
// oxlint-disable-next-line @typescript-eslint/no-explicit-any
export type IconComponent = Component<Record<string, any>, Record<string, any>>;

export const ICONS = {
  "nav-arrow": NavArrow,
  "x-circle-solid": XCircleSolid,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  sun: Sun,
  check: Check,
  "shield-check": ShieldCheck,
  glasses: Glasses,
  user: User,
  eye: Eye,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "shopping-cart": ShoppingCart,
  search: Search,
  aperture: Aperture,
  feather: Feather,
  "play-circle": PlayCircle,
  layers: Layers,
} as const satisfies Record<string, IconComponent>;

export type IconKey = keyof typeof ICONS;
