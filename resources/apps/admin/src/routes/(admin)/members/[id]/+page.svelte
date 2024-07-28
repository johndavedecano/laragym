<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { getAvatarUrl } from '$lib/avatar';

	import Profile from './(components)/profile.svelte';
	import Security from './(components)/security.svelte';
	import Activities from './(components)/activities.svelte';
	import Branches from './(components)/branches.svelte';
	import Subscriptions from './(components)/subscriptions.svelte';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = $_('memset');

	let loading = false;

	let user = {};

	let active = 'profile';

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
			<div class="justify-cente flex items-center justify-center py-8">
				<Avatar
					src={getAvatarUrl(user.avatar)}
					initials={user.initial}
					width="w-32"
					rounded="rounded-full"
				/>
			</div>
			<nav class="list-nav user-nav">
				<ul>
					<li>
						<a
							class={active === 'profile' ? 'active' : ''}
							on:click|preventDefault={() => (active = 'profile')}
							href="/">{$_('profile')}</a
						>
					</li>
					<li>
						<a
							class={active === 'subscriptions' ? 'active' : ''}
							on:click|preventDefault={() => (active = 'subscriptions')}
							href="/">{$_('subscs')}</a
						>
					</li>
					<li>
						<a
							class={active === 'branches' ? 'active' : ''}
							on:click|preventDefault={() => (active = 'branches')}
							href="/">{$_('branches')}</a
						>
					</li>
					<li>
						<a
							class={active === 'activities' ? 'active' : ''}
							on:click|preventDefault={() => (active = 'activities')}
							href="/">{$_('activities')}</a
						>
					</li>
					<li>
						<a
							class={active === 'security' ? 'active' : ''}
							on:click|preventDefault={() => (active = 'security')}
							href="/">{$_('sandp')}</a
						>
					</li>
				</ul>
			</nav>
		</div>
		<div class="flex-1">
			<div class="px-6 py-6">
				{#if user && user.profile}
					{#if active === 'profile'}
						<Profile {user} on:avatar={(event) => (user.avatar = event.detail)} />
					{/if}
					{#if active === 'activities'}
						<Activities {user} />
					{/if}
					{#if active === 'subscriptions'}
						<Subscriptions {user} />
					{/if}
					{#if active === 'branches'}
						<Branches {user} />
					{/if}
					{#if active === 'security'}
						<Security {user} />
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.user-sidebar {
		@apply min-h-full w-72 border-r;
	}

	.user-nav a {
		@apply text-gray-800;
	}

	.user-nav a.active {
		@apply bg-blue-950 text-white;
	}

	.user-nav a:hover {
		@apply text-white;
	}
</style>
