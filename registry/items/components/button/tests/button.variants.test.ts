import fc from "fast-check";
import { describe, expect, test } from "vite-plus/test";

import { cn } from "$lib/utils.js";
import { expectTokens, oneOf, unrelatedClass } from "$lib/testing/variants";

import { BUTTON_SIZES, BUTTON_VARIANTS, buttonCva, buttonVariants } from "../button.variants";

const variantArb = oneOf(BUTTON_VARIANTS);
const sizeArb = oneOf(BUTTON_SIZES);

describe("buttonVariants", () => {
  test("keeps the chosen variant and size classes", () => {
    fc.assert(
      fc.property(variantArb, sizeArb, (variant, size) => {
        const classes = buttonVariants({ variant, size });
        expect(classes).toEqual(expect.any(String));
        expectTokens(classes, buttonCva.variants.variant[variant]);
        expectTokens(classes, buttonCva.variants.size[size]);
      }),
    );
  });

  test("matches default variants when props are omitted", () => {
    expect(buttonVariants()).toBe(
      buttonVariants({
        variant: buttonCva.defaultVariants.variant,
        size: buttonCva.defaultVariants.size,
      }),
    );
  });

  test("keeps variant and size classes when an unrelated class is merged", () => {
    fc.assert(
      fc.property(variantArb, sizeArb, unrelatedClass, (variant, size, extra) => {
        const classes = cn(buttonVariants({ variant, size }), extra);
        expectTokens(classes, buttonCva.variants.variant[variant]);
        expectTokens(classes, buttonCva.variants.size[size]);
        expectTokens(classes, extra);
      }),
    );
  });
});
