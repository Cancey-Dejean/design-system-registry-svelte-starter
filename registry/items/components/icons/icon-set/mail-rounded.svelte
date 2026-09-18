<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { SVGAttributes } from 'svelte/elements';

	let { class: className, ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	aria-hidden="true"
	viewBox="0 0 60 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={cn('size-15', className)}
	{...restProps}
>
	<g filter="url(#filter0_dii_5023_372979)">
		<path
			d="M2 13C2 6.37258 7.37258 1 14 1H46C52.6274 1 58 6.37258 58 13V45C58 51.6274 52.6274 57 46 57H14C7.37258 57 2 51.6274 2 45V13Z"
			fill="white"
		/>
		<path
			d="M14 1.5H46C52.3513 1.5 57.5 6.64873 57.5 13V45C57.5 51.3513 52.3513 56.5 46 56.5H14C7.64873 56.5 2.5 51.3513 2.5 45V13C2.5 6.64873 7.64873 1.5 14 1.5Z"
			stroke="#D5D7DA"
		/>
		<path
			d="M18.3335 23.1666L27.8592 29.8346C28.6306 30.3746 29.0163 30.6446 29.4358 30.7492C29.8064 30.8415 30.194 30.8415 30.5645 30.7492C30.984 30.6446 31.3697 30.3746 32.1411 29.8346L41.6668 23.1666M23.9335 38.3333H36.0668C38.027 38.3333 39.0071 38.3333 39.7558 37.9518C40.4144 37.6163 40.9498 37.0808 41.2854 36.4223C41.6668 35.6736 41.6668 34.6935 41.6668 32.7333V25.2666C41.6668 23.3064 41.6668 22.3264 41.2854 21.5777C40.9498 20.9191 40.4144 20.3837 39.7558 20.0481C39.0071 19.6666 38.027 19.6666 36.0668 19.6666H23.9335C21.9733 19.6666 20.9932 19.6666 20.2445 20.0481C19.586 20.3837 19.0505 20.9191 18.715 21.5777C18.3335 22.3264 18.3335 23.3064 18.3335 25.2666V32.7333C18.3335 34.6935 18.3335 35.6736 18.715 36.4223C19.0505 37.0808 19.586 37.6163 20.2445 37.9518C20.9932 38.3333 21.9733 38.3333 23.9335 38.3333Z"
			stroke="#414651"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</g>
	<defs>
		<filter
			id="filter0_dii_5023_372979"
			x="0"
			y="0"
			width="60"
			height="60"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset dy="1" />
			<feGaussianBlur stdDeviation="1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0"
			/>
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5023_372979" />
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect1_dropShadow_5023_372979"
				result="shape"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset dy="-2" />
			<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0"
			/>
			<feBlend mode="normal" in2="shape" result="effect2_innerShadow_5023_372979" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feMorphology
				radius="1"
				operator="erode"
				in="SourceAlpha"
				result="effect3_innerShadow_5023_372979"
			/>
			<feOffset />
			<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.18 0"
			/>
			<feBlend
				mode="normal"
				in2="effect2_innerShadow_5023_372979"
				result="effect3_innerShadow_5023_372979"
			/>
		</filter>
	</defs>
</svg>
