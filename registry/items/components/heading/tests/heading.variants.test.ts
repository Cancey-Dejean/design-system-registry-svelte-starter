import fc from "fast-check";
import { describe, expect, test } from "vite-plus/test";

import { cn } from "$lib/utils.js";
import { expectAxis, expectTokens, oneOf, unrelatedClass } from "$lib/testing/variants";

import {
  HEADING_SIZES,
  HEADING_TONES,
  HEADING_WEIGHTS,
  headingCva,
  headingVariants,
} from "../heading.variants";

const sizeArb = oneOf(HEADING_SIZES);
const weightArb = oneOf(HEADING_WEIGHTS);
const toneArb = oneOf(HEADING_TONES);
const sizes = Object.values(headingCva.variants.size);
const weights = Object.values(headingCva.variants.weight);
const tones = Object.values(headingCva.variants.tone);

describe("headingVariants", () => {
  test("keeps the chosen size, weight, and tone classes", () => {
    fc.assert(
      fc.property(sizeArb, weightArb, toneArb, (size, weight, tone) => {
        const classes = headingVariants({ size, weight, tone });
        expect(classes).toEqual(expect.any(String));
        expectAxis(classes, headingCva.variants.size[size], sizes);
        expectAxis(classes, headingCva.variants.weight[weight], weights);
        expectAxis(classes, headingCva.variants.tone[tone], tones);
      }),
    );
  });

  test("matches default variants when props are omitted", () => {
    expect(headingVariants()).toBe(
      headingVariants({
        size: headingCva.defaultVariants.size,
        weight: headingCva.defaultVariants.weight,
        tone: headingCva.defaultVariants.tone,
      }),
    );
  });

  test("keeps size and weight classes when an unrelated class is merged", () => {
    fc.assert(
      fc.property(sizeArb, weightArb, toneArb, unrelatedClass, (size, weight, tone, extra) => {
        const classes = cn(headingVariants({ size, weight, tone }), extra);
        expectAxis(classes, headingCva.variants.size[size], sizes);
        expectAxis(classes, headingCva.variants.weight[weight], weights);
        expectTokens(classes, extra);
      }),
    );
  });
});
