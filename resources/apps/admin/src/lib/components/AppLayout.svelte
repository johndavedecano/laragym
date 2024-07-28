<script>
	import { AppShell } from '@skeletonlabs/skeleton';

	import { Drawer } from '@skeletonlabs/skeleton';

	import Navigation from '$lib/components/Navigation.svelte';

	import Header from './Header.svelte';


	import { _ } from 'svelte-i18n';
</script>

<Drawer bgDrawer="bg-gray-800" rounded="rounded-none" width="300px">
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-72">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
