<script>
	import { page } from '$app/stores';

	import { AppShell, AppBar, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

	import { Drawer } from '@skeletonlabs/skeleton';

	import Navigation from '$lib/components/Navigation.svelte';

	import './../../app.pcss';

	initializeStores();

	const drawerStore = getDrawerStore();

	const drawerOpen = () => drawerStore.open({});

	// Reactive Properties
	$: classesSidebarLeft = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
</script>

<!-- Drawer -->
<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 {classesSidebarLeft}">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 lg:hidden" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">Laragym</strong>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
