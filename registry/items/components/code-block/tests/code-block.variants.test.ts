import fc from "fast-check";
import { describe, expect, test } from "vite-plus/test";
import { cn } from "$lib/utils.js";
import { expectTokens, oneOf, unrelatedClass } from "$lib/testing/variants";
import { CODE_BLOCK_VARIANTS, codeBlockCva, codeBlockVariants } from "../code-block.variants";
import {
  CODE_BLOCK_LINE_VARIANTS,
  codeBlockLineCva,
  codeBlockLineVariants,
} from "../code-block-line.variants";

describe("code block variants", () => {
  test("preserves container borders and tone when custom classes are merged", () => {
    fc.assert(
      fc.property(oneOf(CODE_BLOCK_VARIANTS), unrelatedClass, (variant, extra) => {
        const classes = cn(codeBlockVariants({ variant }), extra);
        expectTokens(classes, codeBlockCva.variants.variant[variant]);
        expectTokens(classes, extra);
      }),
    );
  });
  test("preserves diff markers and highlighting when custom classes are merged", () => {
    fc.assert(
      fc.property(oneOf(CODE_BLOCK_LINE_VARIANTS), unrelatedClass, (variant, extra) => {
        const classes = cn(codeBlockLineVariants({ variant }), extra);
        expectTokens(classes, codeBlockLineCva.variants.variant[variant]);
        expectTokens(classes, extra);
      }),
    );
  });
  test("uses the default container and line variants when omitted", () => {
    expect(codeBlockVariants()).toBe(codeBlockVariants(codeBlockCva.defaultVariants));
    expect(codeBlockLineVariants()).toBe(codeBlockLineVariants(codeBlockLineCva.defaultVariants));
  });
});
