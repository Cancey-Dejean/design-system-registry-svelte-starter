import type { HTMLAttributes } from 'svelte/elements';

export type SpinnerProps = HTMLAttributes<SVGElement> & {
	class?: HTMLAttributes<SVGElement>['class'];
};
