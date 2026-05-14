<script>
	// @ts-nocheck
	import { authStore } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';

	const { children } = $props();

	onMount(() => {
		const unsubscribe = authStore.subscribe(($auth) => {
			if (!$auth.isAuthenticated) {
				goto('/login');
			}
		});
		return unsubscribe;
	});
</script>

<div class="flex min-h-screen flex-col bg-surface-900 text-white">
	<!-- Page content with bottom nav clearance -->
	<main class="flex-1 overflow-y-auto with-bottom-nav">
		{@render children()}
	</main>

	<BottomNav />
</div>
