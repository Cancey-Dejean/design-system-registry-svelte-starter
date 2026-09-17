export interface AccentTheme {
  id: string;
  label: string;
  swatchClass: string;
}

export const accentThemes: AccentTheme[] = [
  { id: "default", label: "Default", swatchClass: "bg-neutral-900 dark:bg-neutral-100" },
  { id: "amber", label: "Amber", swatchClass: "bg-amber-500" },
  { id: "violet", label: "Violet", swatchClass: "bg-violet-500" },
];

export const ACCENT_THEME_STORAGE_KEY = "accent-theme";
