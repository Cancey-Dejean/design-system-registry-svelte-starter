import fc from "fast-check";
import { expect } from "vite-plus/test";

export function oneOf<T extends string>(values: readonly T[]) {
  const [first, ...rest] = values;
  if (first === undefined) {
    throw new Error("oneOf requires at least one value");
  }
  return fc.constantFrom(first, ...rest);
}

/** Utilities that do not compete with font-size, font-weight, or text color. */
export const unrelatedClass = fc.constantFrom(
  "underline",
  "mt-4",
  "block",
  "truncate",
  "uppercase",
  "italic",
);

export function classTokens(classes: string) {
  return classes.split(/\s+/).filter(Boolean);
}

export function expectTokens(actual: string, expected: string) {
  const tokens = classTokens(actual);
  for (const token of classTokens(expected)) {
    expect(tokens).toContain(token);
  }
}

export function expectAxis(actual: string, chosen: string, options: readonly string[]) {
  expectTokens(actual, chosen);
  const chosenTokens = new Set(classTokens(chosen));
  const tokens = classTokens(actual);
  for (const option of options) {
    for (const token of classTokens(option)) {
      if (!chosenTokens.has(token)) {
        expect(tokens).not.toContain(token);
      }
    }
  }
}
