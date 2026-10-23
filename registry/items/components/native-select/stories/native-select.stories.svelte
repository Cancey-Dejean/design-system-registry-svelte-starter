<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as NativeSelect from '../index.js';


	const { Story } = defineMeta({
		title: 'Components/Native Select',
		parameters: { centered: true }
	});
</script>

<script lang="ts">
	let value = $state('');
</script>

<Story name="Default">
	<div class="flex min-h-24 items-center justify-center">
		<NativeSelect.Root>
			<NativeSelect.Option value="">Select status</NativeSelect.Option>
			<NativeSelect.Option value="todo">Todo</NativeSelect.Option>
			<NativeSelect.Option value="in-progress">In Progress</NativeSelect.Option>
			<NativeSelect.Option value="done">Done</NativeSelect.Option>
			<NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Story>

<Story name="With Groups">
	<div class="flex min-h-24 items-center justify-center">
		<NativeSelect.Root>
			<NativeSelect.Option value="">Select department</NativeSelect.Option>
			<NativeSelect.OptGroup label="Engineering">
				<NativeSelect.Option value="frontend">Frontend</NativeSelect.Option>
				<NativeSelect.Option value="backend">Backend</NativeSelect.Option>
				<NativeSelect.Option value="devops">DevOps</NativeSelect.Option>
			</NativeSelect.OptGroup>
			<NativeSelect.OptGroup label="Sales">
				<NativeSelect.Option value="sales-rep">Sales Rep</NativeSelect.Option>
				<NativeSelect.Option value="account-manager">Account Manager</NativeSelect.Option>
				<NativeSelect.Option value="sales-director">Sales Director</NativeSelect.Option>
			</NativeSelect.OptGroup>
			<NativeSelect.OptGroup label="Operations">
				<NativeSelect.Option value="support">Customer Support</NativeSelect.Option>
				<NativeSelect.Option value="product-manager">Product Manager</NativeSelect.Option>
				<NativeSelect.Option value="ops-manager">Operations Manager</NativeSelect.Option>
			</NativeSelect.OptGroup>
		</NativeSelect.Root>
	</div>
</Story>

<Story name="Disabled">
	<div class="flex min-h-24 items-center justify-center">
		<NativeSelect.Root disabled>
			<NativeSelect.Option value="">Select priority</NativeSelect.Option>
			<NativeSelect.Option value="low">Low</NativeSelect.Option>
			<NativeSelect.Option value="medium">Medium</NativeSelect.Option>
			<NativeSelect.Option value="high">High</NativeSelect.Option>
			<NativeSelect.Option value="critical">Critical</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Story>

<Story name="Invalid">
	<div class="flex min-h-24 items-center justify-center">
		<NativeSelect.Root aria-invalid="true">
			<NativeSelect.Option value="">Select role</NativeSelect.Option>
			<NativeSelect.Option value="admin">Admin</NativeSelect.Option>
			<NativeSelect.Option value="editor">Editor</NativeSelect.Option>
			<NativeSelect.Option value="viewer">Viewer</NativeSelect.Option>
			<NativeSelect.Option value="guest">Guest</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Story>

<Story name="Size">
	<div class="flex min-h-24 flex-wrap items-center justify-center gap-4">
		<NativeSelect.Root size="sm">
			<NativeSelect.Option value="">Small</NativeSelect.Option>
			<NativeSelect.Option value="a">Option A</NativeSelect.Option>
			<NativeSelect.Option value="b">Option B</NativeSelect.Option>
		</NativeSelect.Root>
		<NativeSelect.Root size="default">
			<NativeSelect.Option value="">Default</NativeSelect.Option>
			<NativeSelect.Option value="a">Option A</NativeSelect.Option>
			<NativeSelect.Option value="b">Option B</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Story>

<Story name="Controlled">
	<div class="flex min-h-24 flex-col items-center justify-center gap-2">
		<NativeSelect.Root bind:value>
			<NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
			<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
			<NativeSelect.Option value="banana">Banana</NativeSelect.Option>
			<NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
			<NativeSelect.Option value="grapes" disabled>Grapes</NativeSelect.Option>
			<NativeSelect.Option value="pineapple">Pineapple</NativeSelect.Option>
		</NativeSelect.Root>
		<p class="text-sm text-muted-foreground">
			{value === '' ? 'No selection' : `Selected: ${value}`}
		</p>
	</div>
</Story>
