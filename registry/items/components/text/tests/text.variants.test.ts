import fc from "fast-check";
import { describe, expect, test } from "vite-plus/test";

import { cn } from "$lib/utils.js";
import { expectAxis, expectTokens, oneOf, unrelatedClass } from "$lib/testing/variants";

import {
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TEXT_TONES,
  TEXT_WEIGHTS,
  textCva,
  textVariants,
} from "../text.variants";

const sizeArb = oneOf(TEXT_SIZES);
const weightArb = oneOf(TEXT_WEIGHTS);
const toneArb = oneOf(TEXT_TONES);
const alignArb = oneOf(TEXT_ALIGNMENTS);
const sizes = Object.values(textCva.variants.size);
const weights = Object.values(textCva.variants.weight);
const tones = Object.values(textCva.variants.tone);
const alignments = Object.values(textCva.variants.align);

describe("textVariants", () => {
  test("keeps the chosen size, weight, tone, and align classes", () => {
    fc.assert(
      fc.property(sizeArb, weightArb, toneArb, alignArb, (size, weight, tone, align) => {
        const classes = textVariants({ size, weight, tone, align });
        expect(classes).toEqual(expect.any(String));
        expectAxis(classes, textCva.variants.size[size], sizes);
        expectAxis(classes, textCva.variants.weight[weight], weights);
        expectAxis(classes, textCva.variants.tone[tone], tones);
        expectAxis(classes, textCva.variants.align[align], alignments);
      }),
    );
  });

  test("matches default variants when props are omitted", () => {
    expect(textVariants()).toBe(
      textVariants({
        size: textCva.defaultVariants.size,
        weight: textCva.defaultVariants.weight,
        tone: textCva.defaultVariants.tone,
        align: textCva.defaultVariants.align,
      }),
    );
  });

  test("keeps size and weight classes when an unrelated class is merged", () => {
    fc.assert(
      fc.property(
        sizeArb,
        weightArb,
        toneArb,
        alignArb,
        unrelatedClass,
        (size, weight, tone, align, extra) => {
          const classes = cn(textVariants({ size, weight, tone, align }), extra);
          expectAxis(classes, textCva.variants.size[size], sizes);
          expectAxis(classes, textCva.variants.weight[weight], weights);
          expectTokens(classes, extra);
        },
      ),
    );
  });
});
