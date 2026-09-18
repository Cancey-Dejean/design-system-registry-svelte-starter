import Content from './empty-content.svelte';
import Description from './empty-description.svelte';
import Header from './empty-header.svelte';
import Media from './empty-media.svelte';
import Title from './empty-title.svelte';
import Root from './empty.svelte';
import { emptyMediaVariants, type EmptyMediaVariant } from './empty-media.variants.js';

export {
	Root,
	Header,
	Media,
	Title,
	Description,
	Content,
	emptyMediaVariants,
	type EmptyMediaVariant,
	//
	Root as Empty,
	Header as EmptyHeader,
	Media as EmptyMedia,
	Title as EmptyTitle,
	Description as EmptyDescription,
	Content as EmptyContent
};
