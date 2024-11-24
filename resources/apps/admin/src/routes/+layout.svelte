<script>
	import { createActivitiesStoreContext } from '$lib/stores/activities.store.svelte';
	import { createDashboardStoreContext } from '$lib/stores/dashboard.store.svelte';

	// @ts-nocheck

	import './../app.pcss';

	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';

	initializeStores();

	createDashboardStoreContext();
	createActivitiesStoreContext();
</script>

<Toast />
<Modal />

<slot></slot>
