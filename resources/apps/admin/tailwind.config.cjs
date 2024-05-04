// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			width: {
				1200: '75rem'
			},
			maxWidth: {
				1200: '75rem'
			}
		}
	},
	plugins: [
		skeleton({
			themes: { preset: ['skeleton', 'modern', 'crimson', 'wintry'] }
		}),
		forms
	]
};
