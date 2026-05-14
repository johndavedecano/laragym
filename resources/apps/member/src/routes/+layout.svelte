<script>
	// @ts-nocheck
	import '../app.pcss';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';

	initializeStores();

	const { children } = $props();
</script>

<Toast />

{@render children()}
