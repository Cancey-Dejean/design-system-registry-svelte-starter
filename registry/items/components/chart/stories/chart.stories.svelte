<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { scaleBand } from 'd3-scale';
	import { BarChart, LineChart } from 'layerchart';
	import * as Chart from '../index.js';
	import StoryWrapper from '$lib/components/utility/story-wrapper.svelte';

	const { Story } = defineMeta({
		title: 'Components/Chart',
		decorators: [() => StoryWrapper]
	});
</script>

<script lang="ts">
	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;

	const series = [
		{
			key: 'desktop' as const,
			label: chartConfig.desktop.label,
			color: chartConfig.desktop.color
		},
		{
			key: 'mobile' as const,
			label: chartConfig.mobile.label,
			color: chartConfig.mobile.color
		}
	];
</script>

{#snippet barChart(showLegend = false)}
	<BarChart
		data={chartData}
		xScale={scaleBand().padding(0.25)}
		x="month"
		axis="x"
		seriesLayout="group"
		legend={showLegend}
		{series}
		props={{
			xAxis: {
				format: (d) => d.slice(0, 3)
			}
		}}
	>
		{#snippet tooltip()}
			<Chart.Tooltip />
		{/snippet}
	</BarChart>
{/snippet}

<Story name="Bar">
	<div class="w-full max-w-xl">
		<Chart.Container config={chartConfig} class="min-h-[240px] w-full">
			{@render barChart()}
		</Chart.Container>
	</div>
</Story>

<Story name="Bar with Legend">
	<div class="w-full max-w-xl">
		<Chart.Container config={chartConfig} class="min-h-[240px] w-full">
			{@render barChart(true)}
		</Chart.Container>
	</div>
</Story>

<Story name="Line">
	<div class="w-full max-w-xl">
		<Chart.Container config={chartConfig} class="min-h-[240px] w-full">
			<LineChart
				data={chartData}
				x="month"
				axis="x"
				series={[
					{
						key: 'desktop',
						label: chartConfig.desktop.label,
						color: chartConfig.desktop.color
					},
					{
						key: 'mobile',
						label: chartConfig.mobile.label,
						color: chartConfig.mobile.color
					}
				]}
				props={{
					xAxis: {
						format: (d) => d.slice(0, 3)
					}
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</div>
</Story>

<Story name="Tooltip Indicator">
	<div class="w-full max-w-xl">
		<div class="flex flex-col gap-8">
			<div>
				<p class="mb-2 text-sm text-muted-foreground">Dot indicator</p>
				<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
					<BarChart
						data={chartData}
						xScale={scaleBand().padding(0.25)}
						x="month"
						axis="x"
						seriesLayout="group"
						{series}
						props={{ xAxis: { format: (d) => d.slice(0, 3) } }}
					>
						{#snippet tooltip()}
							<Chart.Tooltip indicator="dot" />
						{/snippet}
					</BarChart>
				</Chart.Container>
			</div>
			<div>
				<p class="mb-2 text-sm text-muted-foreground">Dashed indicator</p>
				<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
					<BarChart
						data={chartData}
						xScale={scaleBand().padding(0.25)}
						x="month"
						axis="x"
						seriesLayout="group"
						{series}
						props={{ xAxis: { format: (d) => d.slice(0, 3) } }}
					>
						{#snippet tooltip()}
							<Chart.Tooltip indicator="dashed" />
						{/snippet}
					</BarChart>
				</Chart.Container>
			</div>
		</div>
	</div>
</Story>
