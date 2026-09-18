import type { HTMLAnchorAttributes } from 'svelte/elements';

export type LinkSpreadProps = HTMLAnchorAttributes & {
	/** Opens the link in a new tab when true. */
	newTab?: boolean;
};
