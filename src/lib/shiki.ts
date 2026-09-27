import {
  createHighlighter,
  type Highlighter,
  type LanguageRegistration,
  type ShikiTransformer,
} from "shiki";

export type HighlightLang =
  | "svelte"
  | "typescript"
  | "bash"
  | "css"
  | "json"
  | "yaml"
  | "text"
  | "tree";

const BUNDLED_LANGS: Exclude<HighlightLang, "tree">[] = [
  "svelte",
  "typescript",
  "bash",
  "css",
  "json",
  "yaml",
  "text",
];

const SHIKI_LANGS: HighlightLang[] = [...BUNDLED_LANGS, "tree"];

// Reuse YAML token scopes so file trees pick up the same green keys / blue
// strings as the `files:` examples on the Registry docs page.
const TREE_LANG: LanguageRegistration = {
  name: "tree",
  scopeName: "source.tree",
  aliases: ["filetree"],
  patterns: [
    {
      name: "entity.name.tag.yaml",
      match: "(?:[\\w.@+-]+/)+",
    },
    {
      name: "string.unquoted.yaml",
      match: "[\\w.@+-]+",
    },
  ],
};

const LANG_ALIASES: Record<string, HighlightLang> = {
  "": "text",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  js: "typescript",
  javascript: "typescript",
  filetree: "tree",
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [...BUNDLED_LANGS, TREE_LANG],
  });
  return highlighterPromise;
}

export function resolveHighlightLang(lang: string): HighlightLang {
  const normalized = lang.trim().toLowerCase();
  if (LANG_ALIASES[normalized]) return LANG_ALIASES[normalized];
  return (SHIKI_LANGS as string[]).includes(normalized) ? (normalized as HighlightLang) : "text";
}

// Renders a real line-number gutter as part of the HAST tree instead of a CSS
// counter, so numbering stays correct regardless of wrapping and the numbers
// can be excluded from copy/selection with plain `user-select: none`.
const lineNumbers: ShikiTransformer = {
  name: "line-numbers",
  line(node, line) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: { class: "line-number" },
      children: [{ type: "text", value: String(line) }],
    });
  },
};

export async function highlightCode(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter();
  const resolvedLang = resolveHighlightLang(lang);
  return highlighter.codeToHtml(code, {
    lang: resolvedLang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
    transformers: [lineNumbers],
  });
}
