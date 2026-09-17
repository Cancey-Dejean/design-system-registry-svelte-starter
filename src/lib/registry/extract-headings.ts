import GithubSlugger from "github-slugger";

export interface HeadingEntry {
  id: string;
  label: string;
}

const H2_PATTERN = /^##\s+(.+)$/;

/** Extracts h2 headings from raw markdown, slugging ids the same way rehype-slug does. */
export function extractHeadings(markdown: string): HeadingEntry[] {
  const slugger = new GithubSlugger();
  const headings: HeadingEntry[] = [];

  for (const line of markdown.split("\n")) {
    const match = H2_PATTERN.exec(line.trim());
    if (!match) continue;
    const label = match[1].trim();
    headings.push({ id: slugger.slug(label), label });
  }

  return headings;
}
