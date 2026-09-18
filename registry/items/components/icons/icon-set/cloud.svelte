<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { SVGAttributes } from 'svelte/elements';

	let { class: className, ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	aria-hidden="true"
	viewBox="0 0 154 121"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={cn(className)}
	{...restProps}
>
	<circle cx="77" cy="52" r="52" fill="#F5F5F5" />
	<g filter="url(#filter0_ddd_1266_30154)">
		<path
			d="M78.6 16C67.8273 16 58.2978 21.3233 52.4987 29.4829C50.605 29.0363 48.6301 28.8 46.6 28.8C32.4615 28.8 21 40.2615 21 54.4C21 68.5385 32.4615 80 46.6 80L110.6 80C122.971 80 133 69.9712 133 57.6C133 45.2288 122.971 35.2 110.6 35.2C109.721 35.2 108.854 35.2506 108.002 35.349C103.098 23.9677 91.7797 16 78.6 16Z"
			fill="#FAFAFA"
		/>
		<path
			d="M78.5996 15.5C91.8552 15.5 103.255 23.4366 108.312 34.8145C109.064 34.7397 109.827 34.7002 110.6 34.7002C123.247 34.7002 133.5 44.9525 133.5 57.5996C133.5 70.0492 123.565 80.1785 111.191 80.4922L110.6 80.5H46.5996C32.1853 80.4998 20.5002 68.8147 20.5 54.4004C20.5 39.9859 32.1852 28.3 46.5996 28.2998C48.5525 28.2998 50.4558 28.5168 52.2871 28.9238C58.1932 20.7911 67.7778 15.5001 78.5996 15.5Z"
			stroke="black"
			stroke-opacity="0.08"
		/>
		<ellipse cx="46.6" cy="54.3998" rx="25.6" ry="25.6" fill="url(#paint0_linear_1266_30154)" />
		<circle cx="78.6" cy="48" r="32" fill="url(#paint1_linear_1266_30154)" />
		<ellipse cx="110.6" cy="57.6002" rx="22.4" ry="22.4" fill="url(#paint2_linear_1266_30154)" />
	</g>
	<circle cx="22" cy="19" r="5" fill="#F5F5F5" />
	<circle cx="19" cy="109" r="7" fill="#F5F5F5" />
	<circle cx="146" cy="35" r="7" fill="#F5F5F5" />
	<circle cx="135" cy="8" r="4" fill="#F5F5F5" />
	<foreignObject x="45" y="54" width="64" height="64">
		<div
			style="backdrop-filter: blur(4px); clip-path: url(#bgblur_0_1266_30154_clip_path); height: 100%; width: 100%"
		></div>
	</foreignObject>
	<g data-figma-bg-blur-radius="8">
		<path
			d="M53 86C53 72.7452 63.7452 62 77 62C90.2548 62 101 72.7452 101 86C101 99.2548 90.2548 110 77 110C63.7452 110 53 99.2548 53 86Z"
			fill="black"
			fill-opacity="0.2"
		/>
		<path
			d="M71 90.9998C71 91.3511 71 91.5268 71.0157 91.6795C71.1457 92.9473 72.0626 93.9945 73.3021 94.291C73.4513 94.3267 73.6255 94.3499 73.9737 94.3963L80.5656 95.2753C82.442 95.5254 83.3803 95.6505 84.1084 95.361C84.7478 95.1068 85.2803 94.6406 85.6168 94.0405C86 93.3569 86 92.4104 86 90.5174V81.4823C86 79.5893 86 78.6428 85.6168 77.9592C85.2803 77.3591 84.7478 76.8929 84.1084 76.6387C83.3803 76.3491 82.442 76.4742 80.5656 76.7244L73.9737 77.6033C73.6255 77.6498 73.4514 77.673 73.3021 77.7087C72.0626 78.0052 71.1457 79.0524 71.0157 80.3202C71 80.4729 71 80.6485 71 80.9998M77 81.9998L81 85.9998M81 85.9998L77 89.9998M81 85.9998H68"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</g>
	<defs>
		<filter
			id="filter0_ddd_1266_30154"
			x="0"
			y="15"
			width="154"
			height="106"
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
			<feMorphology
				radius="1.5"
				operator="erode"
				in="SourceAlpha"
				result="effect1_dropShadow_1266_30154"
			/>
			<feOffset dy="3" />
			<feGaussianBlur stdDeviation="1.5" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.04 0"
			/>
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1266_30154" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feMorphology
				radius="4"
				operator="erode"
				in="SourceAlpha"
				result="effect2_dropShadow_1266_30154"
			/>
			<feOffset dy="8" />
			<feGaussianBlur stdDeviation="4" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.03 0"
			/>
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1266_30154"
				result="effect2_dropShadow_1266_30154"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feMorphology
				radius="4"
				operator="erode"
				in="SourceAlpha"
				result="effect3_dropShadow_1266_30154"
			/>
			<feOffset dy="20" />
			<feGaussianBlur stdDeviation="12" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.08 0"
			/>
			<feBlend
				mode="normal"
				in2="effect2_dropShadow_1266_30154"
				result="effect3_dropShadow_1266_30154"
			/>
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect3_dropShadow_1266_30154"
				result="shape"
			/>
		</filter>
		<clipPath id="bgblur_0_1266_30154_clip_path" transform="translate(-45 -54)">
			<path
				d="M53 86C53 72.7452 63.7452 62 77 62C90.2548 62 101 72.7452 101 86C101 99.2548 90.2548 110 77 110C63.7452 110 53 99.2548 53 86Z"
			/>
		</clipPath>
		<linearGradient
			id="paint0_linear_1266_30154"
			x1="26.9429"
			y1="37.4855"
			x2="72.2"
			y2="79.9998"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color="#E9EAEB" />
			<stop offset="0.350715" stop-color="#FAFAFA" />
		</linearGradient>
		<linearGradient
			id="paint1_linear_1266_30154"
			x1="54.0286"
			y1="26.8571"
			x2="110.6"
			y2="80"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color="#E9EAEB" />
			<stop offset="0.350715" stop-color="#FAFAFA" />
		</linearGradient>
		<linearGradient
			id="paint2_linear_1266_30154"
			x1="93.4"
			y1="42.8002"
			x2="133"
			y2="80.0002"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color="#E9EAEB" />
			<stop offset="0.350715" stop-color="#FAFAFA" />
		</linearGradient>
	</defs>
</svg>
