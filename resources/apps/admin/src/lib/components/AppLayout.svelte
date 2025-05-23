<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<Drawer bgDrawer="bg-gray-800" rounded="rounded-none" width="300px">
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-72">
	{#snippet header()}
		<Header />
	{/snippet}
	{#snippet sidebarLeft()}
		<Navigation />
	{/snippet}
	{@render children()}
</AppShell>
