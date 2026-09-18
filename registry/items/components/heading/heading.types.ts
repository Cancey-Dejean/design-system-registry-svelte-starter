import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { headingVariants } from './heading.variants';

type HeadingVariantProps = VariantProps<typeof headingVariants>;

export type HeadingLevel = NonNullable<HeadingVariantProps['level']>;
export type HeadingSize = NonNullable<HeadingVariantProps['size']>;
export type HeadingWeight = NonNullable<HeadingVariantProps['weight']>;
export type HeadingTone = NonNullable<HeadingVariantProps['tone']>;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
	level?: HeadingLevel;
	size?: HeadingSize;
	weight?: HeadingWeight;
	tone?: HeadingTone;
	ref?: HTMLHeadingElement | null;
	children?: Snippet;
};
