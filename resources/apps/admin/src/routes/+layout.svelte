<script>
	import { createDashboardStoreContext } from '$lib/stores/dashboard.store.svelte';

	// @ts-nocheck

	import './../app.pcss';

	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';

	initializeStores();

	createDashboardStoreContext();
</script>

<Toast />
<Modal />

<slot></slot>
