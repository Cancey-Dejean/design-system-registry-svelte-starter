import { tv } from 'tailwind-variants';

export const containerCva = {
	variants: {
		size: {
			base: 'max-w-[1280px]',
			contained: 'max-w-5xl',
			thin: 'max-w-[996px]',
			full: 'max-w-full'
		},
		defaultVariants: {
			size: 'base'
		}
	},
	defaultVariants: {
		size: 'base'
	}
} as const;

export const containerVariants = tv({
	base: 'mx-auto w-full md:px-8 px-4',
	...containerCva
});

export const CONTAINER_SIZES = Object.keys(
	containerCva.variants.size
) as (keyof typeof containerCva.variants.size)[];
