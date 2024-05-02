<script>
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const drawerOpen = () => drawerStore.open({});
</script>

<AppBar background="bg-blue-950">
	<svelte:fragment slot="lead">
		<div class="flex items-center to-blue-950">
			<button class="btn btn-sm mr-4 lg:hidden" on:click={drawerOpen}>
				<span>
					<svg viewBox="0 0 100 80" class="h-4 w-4 fill-white">
						<rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</span>
			</button>
			<strong class="text-xl text-white">laragym</strong>
		</div>
	</svelte:fragment>
</AppBar>
