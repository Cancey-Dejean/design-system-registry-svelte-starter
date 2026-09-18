import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { textVariants } from './text.variants';

type TextVariantProps = VariantProps<typeof textVariants>;

export type TextSize = NonNullable<TextVariantProps['size']>;
export type TextWeight = NonNullable<TextVariantProps['weight']>;
export type TextTone = NonNullable<TextVariantProps['tone']>;
export type TextAlign = NonNullable<TextVariantProps['align']>;

export type TextProps = HTMLAttributes<HTMLElement> & {
	as?: keyof HTMLElementTagNameMap | (string & {});
	size?: TextSize;
	weight?: TextWeight;
	tone?: TextTone;
	align?: TextAlign;
	ref?: HTMLElement | null;
	children?: Snippet;
};
