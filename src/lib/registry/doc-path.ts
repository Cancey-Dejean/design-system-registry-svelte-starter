/** The introduction is the docs landing page; retain its authored slug internally. */
export function getDocPath(slug: string): string {
  return slug === "index" ? "/docs" : `/docs/${slug}`;
}
