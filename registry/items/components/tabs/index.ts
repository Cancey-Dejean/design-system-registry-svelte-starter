import Content from './tabs-content.svelte';
import List from './tabs-list.svelte';
import { tabsListVariants, type TabsListVariant } from './tabs-list.variants.js';
import Trigger from './tabs-trigger.svelte';
import Root from './tabs.svelte';

export {
	Root,
	Content,
	List,
	Trigger,
	tabsListVariants,
	type TabsListVariant,
	//
	Root as Tabs,
	Content as TabsContent,
	List as TabsList,
	Trigger as TabsTrigger
};
