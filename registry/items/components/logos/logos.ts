import type { Component } from 'svelte';

import AlphaWave from './logo-set/alpha-wave.svelte';
import Apple from './logo-set/apple.svelte';
import AppleStore from './logo-set/apple-store.svelte';
import Facebook from './logo-set/facebook.svelte';
import Google from './logo-set/google.svelte';
import Instagram from './logo-set/instagram.svelte';
import LeapYear from './logo-set/leap-year.svelte';
import Logo from './logo-set/logo.svelte';
import LogoText from './logo-set/logo-text.svelte';
import MainLogo from './logo-set/main-logo.svelte';
import PlayStore from './logo-set/play-store.svelte';
import SvelteLogo from './logo-set/svelte-logo.svelte';
import ThreePortals from './logo-set/three-portals.svelte';
import VoxelLabs from './logo-set/voxel-labs.svelte';
import XLogo from './logo-set/x.svelte';

// Mixed SVG + image logos share a loose class prop contract.
// oxlint-disable-next-line @typescript-eslint/no-explicit-any
export type LogoComponent = Component<Record<string, any>, Record<string, any>>;

export const LOGOS = {
	logo: Logo,
	'logo-text': LogoText,
	apple: Apple,
	'main-logo': MainLogo,
	'three-portals': ThreePortals,
	'alpha-wave': AlphaWave,
	'leap-year': LeapYear,
	'voxel-labs': VoxelLabs,
	'apple-store': AppleStore,
	'google-play': PlayStore,
	instagram: Instagram,
	'x-logo': XLogo,
	facebook: Facebook,
	google: Google,
	'svelte-logo': SvelteLogo
} as const satisfies Record<string, LogoComponent>;

export type LogoKey = keyof typeof LOGOS;
