<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getErrorMessage } from '$lib/api';
	import { getAvatarUrl } from '$lib/avatar';
	import { getMemberStoreContext } from '$lib/stores/members.store.svelte';
	import { useToast } from '$lib/toast';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import Activities from './(components)/activities.svelte';
	import Branches from './(components)/branches.svelte';
	import Profile from './(components)/profile.svelte';
	import Security from './(components)/security.svelte';
	import Subscriptions from './(components)/subscriptions.svelte';

	const store = getMemberStoreContext();

	const toast = useToast();

	const title = 'Member Settings';

	let loading = $state(false);

	let user = $state({});

	let active = $state('profile');

	const loadUser = () => {
		loading = true;
		store
			.loadMember($page.params.id)
			.then((response) => (user = response))
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
				goto('/members');
			})
			.finally(() => (loading = false));
	};

	const onNavItemClicked = (next) => (event) => {
		event.preventDefault();
		active = next;
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
			<nav class="user-nav list-nav">
				<ul>
					<li>
						<a
							class={active === 'profile' ? 'active' : ''}
							onclick={onNavItemClicked('profile')}
							href="/">Profile</a
						>
					</li>
					<li>
						<a
							class={active === 'subscriptions' ? 'active' : ''}
							onclick={onNavItemClicked('subscriptions')}
							href="/">Subscriptions</a
						>
					</li>
					<li>
						<a
							class={active === 'branches' ? 'active' : ''}
							onclick={onNavItemClicked('branches')}
							href="/">Branches</a
						>
					</li>
					<li>
						<a
							class={active === 'activities' ? 'active' : ''}
							onclick={onNavItemClicked('activities')}
							href="/">Activities</a
						>
					</li>
					<li>
						<a
							class={active === 'security' ? 'active' : ''}
							onclick={onNavItemClicked('security')}
							href="/">Security and Privacy</a
						>
					</li>
				</ul>
			</nav>
		</div>
		<div class="flex-1">
			<div class="px-6 py-6">
				{#if user && user.profile}
					{#if active === 'profile'}
						<Profile {user} onChangeAvatar={(event) => (user.avatar = event.detail)} />
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

<style lang="postcss">
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
