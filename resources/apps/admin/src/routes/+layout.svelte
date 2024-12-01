<script>
	import { createActivitiesStoreContext } from '$lib/stores/activities.store.svelte';
	import { createAttendanceStoreContext } from '$lib/stores/attendance.store.svelte';
	import { createBranchStoreContext } from '$lib/stores/branches.store.svelte';
	import { createDashboardStoreContext } from '$lib/stores/dashboard.store.svelte';
	import { createMemberStoreContext } from '$lib/stores/members.store.svelte';

	// @ts-nocheck

	import './../app.pcss';

	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';

	initializeStores();

	createDashboardStoreContext();
	createActivitiesStoreContext();
	createAttendanceStoreContext();
	createBranchStoreContext();
	createMemberStoreContext();

	const { children } = $props();
</script>

<Toast />
<Modal />

{@render children()}
