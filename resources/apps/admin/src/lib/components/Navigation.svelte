<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const drawerClose = () => drawerStore.close();
</script>

<nav class="list-nav p-4">
	<slot />
</nav>
