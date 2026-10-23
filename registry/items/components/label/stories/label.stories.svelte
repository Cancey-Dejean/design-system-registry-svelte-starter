<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Label } from '../index.js';
	import { Input } from '../../input/index.js';
	import { Checkbox } from '../../checkbox/index.js';


	const { Story } = defineMeta({
		title: 'Components/Label',
		parameters: { centered: true }
	});
</script>

<Story name="Default">
	<div class="grid w-full max-w-sm gap-2">
		<Label for="email">Email</Label>
		<Input id="email" type="email" placeholder="you@example.com" />
	</div>
</Story>

<Story name="With Checkbox">
	<div class="flex items-center gap-3">
		<Checkbox id="terms" />
		<Label for="terms">Accept terms and conditions</Label>
	</div>
</Story>
