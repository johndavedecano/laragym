<script>
	// @ts-nocheck
	import { authStore } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const { children } = $props();

	onMount(() => {
		// If already logged in, redirect to dashboard
		const unsubscribe = authStore.subscribe(($auth) => {
			if ($auth.isAuthenticated) {
				goto('/');
			}
		});
		return unsubscribe;
	});
</script>

<div class="auth-wrapper min-h-screen bg-gradient-to-br from-surface-900 to-surface-800">
	<div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
		<!-- Logo / Brand -->
		<div class="mb-8 text-center">
			<div
				class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="white"
					class="h-10 w-10"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
					/>
				</svg>
			</div>
			<h1 class="text-2xl font-bold text-white">LaraGym</h1>
			<p class="text-sm text-surface-300">Member Portal</p>
		</div>

		<!-- Auth card -->
		<div class="w-full max-w-sm">
			<div class="card rounded-2xl bg-surface-800 p-6 shadow-2xl">
				{@render children()}
			</div>
		</div>
	</div>
</div>
