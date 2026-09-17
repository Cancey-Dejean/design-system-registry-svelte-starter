import { createHighlighter, type Highlighter } from "shiki";

export type HighlightLang = "svelte" | "typescript" | "bash";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["svelte", "typescript", "bash"],
  });
  return highlighterPromise;
}

export async function highlightCode(code: string, lang: HighlightLang): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
