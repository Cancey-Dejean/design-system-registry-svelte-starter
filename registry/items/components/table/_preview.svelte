<script lang="ts">
	import * as Table from './index.js';
</script>

<div class="w-full max-w-lg">
	<Table.Root>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Invoice</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Method</Table.Head>
				<Table.Head class="text-end">Amount</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium">INV001</Table.Cell>
				<Table.Cell>Paid</Table.Cell>
				<Table.Cell>Credit Card</Table.Cell>
				<Table.Cell class="text-end">$250.00</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">INV002</Table.Cell>
				<Table.Cell>Pending</Table.Cell>
				<Table.Cell>PayPal</Table.Cell>
				<Table.Cell class="text-end">$150.00</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">INV003</Table.Cell>
				<Table.Cell>Unpaid</Table.Cell>
				<Table.Cell>Bank Transfer</Table.Cell>
				<Table.Cell class="text-end">$350.00</Table.Cell>
			</Table.Row>
		</Table.Body>
		<Table.Footer>
			<Table.Row>
				<Table.Cell colspan={3}>Total</Table.Cell>
				<Table.Cell class="text-end">$750.00</Table.Cell>
			</Table.Row>
		</Table.Footer>
	</Table.Root>
</div>
