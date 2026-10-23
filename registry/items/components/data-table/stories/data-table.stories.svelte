<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTable from '../data-table.svelte';
	import * as Table from '../../table/index.js';


	const { Story } = defineMeta({
		title: 'Components/Data Table',
		parameters: { centered: true }
	});
</script>

<Story name="Default">
	<div class="w-full max-w-4xl">
		<DataTable />
	</div>
</Story>

<Story name="Basic Table">
	<div class="w-full max-w-2xl">
		<div class="rounded-md border">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Status</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head class="text-end">Amount</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Success</Table.Cell>
						<Table.Cell>ken99@yahoo.com</Table.Cell>
						<Table.Cell class="text-end">$316.00</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Success</Table.Cell>
						<Table.Cell>Abe45@gmail.com</Table.Cell>
						<Table.Cell class="text-end">$242.00</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Processing</Table.Cell>
						<Table.Cell>Monserrat44@gmail.com</Table.Cell>
						<Table.Cell class="text-end">$837.00</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</Story>
