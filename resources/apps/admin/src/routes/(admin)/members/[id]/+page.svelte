<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Profile from './(components)/profile.svelte';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = 'Member Settings';

	let loading = false;

	let user = {};

	const loadUser = () => {
		loading = true;
		api.get(`/users/${$page.params.id}`)
			.then((response) => (user = response.data))
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
				goto('/members');
			})
			.finally(() => (loading = false));
	};

	onMount(() => {
		loadUser();
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="px-6 py-6">
	<div class="card flex min-h-screen flex-row items-stretch rounded-lg bg-white shadow-md">
		<div class="user-sidebar">
			<div class="flex items-center justify-center bg-gray-200 py-16">
				<Avatar
					src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
					width="w-32"
					rounded="rounded-full"
				/>
			</div>
			<nav class="list-nav user-nav pt-6">
				<ul>
					<li>
						<a class="text-black" href="/">Profile</a>
					</li>
					<li>
						<a class="text-black" href="/">Subscription</a>
					</li>
					<li>
						<a class="text-black" href="/">Activities</a>
					</li>
					<li>
						<a class="text-black" href="/">Security and Privacy</a>
					</li>
				</ul>
			</nav>
		</div>
		<div class="flex-1">
			<div class="px-6 py-6">
				{#if user && user.profile}
					<Profile {user} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.user-sidebar {
		@apply min-h-full w-72 border-r bg-slate-100;
	}

	.user-nav a {
		@apply text-gray-800;
	}

	.user-nav a:hover {
		@apply text-white;
	}
</style>
