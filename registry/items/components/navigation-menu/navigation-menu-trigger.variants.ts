import { tv } from 'tailwind-variants';

export const navigationMenuTriggerStyle = tv({
	base: 'rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none'
});
