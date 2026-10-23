import { expect, test } from "vite-plus/test";
import { loadHighlighter } from "../highlighter";

test("unknown languages keep the plain-text fallback", async () => {
  expect(await loadHighlighter("not-a-language")).toBeNull();
});

test("aliases preserve line content and attach light and dark token colors", async () => {
  const highlighter = await loadHighlighter("ts");
  const lines = highlighter!.highlight('const greeting = "hello";\nconsole.log(greeting);').lines;
  expect(lines.map((line) => line.map((token) => token.content).join(""))).toEqual([
    'const greeting = "hello";',
    "console.log(greeting);",
  ]);
  expect(lines.flat().some((token) => token.style.includes("--shiki-light"))).toBe(true);
  expect(lines.flat().some((token) => token.style.includes("--shiki-dark"))).toBe(true);
});

test("continued multiline syntax matches highlighting the complete source", async () => {
  const highlighter = (await loadHighlighter("typescript"))!;
  const first = highlighter.highlight("/* start");
  const second = highlighter.highlight("still comment */\nconst x = 1;", first.state);
  expect([...first.lines, ...second.lines]).toEqual(
    highlighter.highlight("/* start\nstill comment */\nconst x = 1;").lines,
  );
});
