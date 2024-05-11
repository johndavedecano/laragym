<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	import UserSelect from './UserSelect.svelte';
	import SubscriptionList from './SubscriptionList.svelte';
	import SubscriptionCard from './SubscriptionCard.svelte';
	import { useToast } from '$lib/toast';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getAvatarUrl } from '$lib/avatar';
	import Status from './Status.svelte';

	let user = null;
	let subscriptions = [];
	let type = 'login';
	let loading = false;
	let branches = [];

	const toast = useToast();
	const api = useApi({
		Authorization: getBearerToken()
	});
	const dispatch = createEventDispatcher();

	const onChangeUser = (event) => {
		subscriptions = [];
		loadSubscriptions(event.detail.id);
		loadBranches(event.detail.id);
	};

	const loadSubscriptions = (id) => {
		loading = true;
		api.get(`/subscriptions?user_id=${id}`)
			.then((response) => (subscriptions = response.data))
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
			})
			.finally(() => (loading = false));
	};

	const loadBranches = (id) => {
		loading = true;
		api.get(`/users/${id}/branches`)
			.then((response) => (branches = response.data))
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
			})
			.finally(() => (loading = false));
	};

	const onLogActivity = async () => {
		try {
			loading = true;

			let description;

			if (type === 'login') {
				description = `User ${user.id} : ${user.name} has logged in`;
			} else if (type === 'logout') {
				description = `User ${user.id} : ${user.name} has logged out`;
			}

			await api.post('/activities', {
				entity_id: user.id,
				description,
				type: 'attendance'
			});

			toast.trigger({
				// @ts-ignore
				message: description,
				background: 'variant-filled-success'
			});

			loading = false;

			dispatch('load');
		} catch (error) {
			loading = false;
			toast.trigger({
				// @ts-ignore
				message: getErrorMessage(error),
				background: 'variant-filled-error'
			});
		}
	};
</script>

<div class="card flex-1 flex-col bg-white shadow-lg lg:flex-row">
	<div class="card-header border-b p-4">
		<div class="flex-1 font-bold">Member Login</div>
	</div>
	<div class="card-body p-4">
		<p class="mb-2 block">Please search for a member to get started.</p>
		<UserSelect
			searchable
			clearable
			bind:value={user}
			placeholder="Search Member"
			on:change={onChangeUser}
		/>
		{#if user}
			<div class="pt-4">
				<div class="mb-4 mt-6 flex-1 font-bold">Member Information</div>
				<div class="mb-6 flex items-center gap-4">
					<Avatar
						src={user.avatar ? getAvatarUrl(user.avatar) : undefined}
						initials={user.avatar ? undefined : user.initial}
						width="w-16"
						rounded="rounded-full"
					/>
					<div>
						<div class="flex flex-row gap-4">
							<a href={`/members/${user.id}`} class="font-bold">{user.name}</a>
							<Status status={user.status} />
						</div>
						<a href="mailto:{user.email}" class="text-sm text-gray-500">{user.email}</a>
					</div>
				</div>
				<div class="mb-4 flex-1 font-bold">Member Subscriptions</div>
				<SubscriptionList>
					{#each subscriptions as item}
						<SubscriptionCard {item} action={false} />
					{:else}
						<div class="text-xs text-gray-500">
							This member does not have any subscriptions
						</div>
					{/each}
				</SubscriptionList>
				<div class="mb-4 mt-6 flex-1 font-bold">Member Branches</div>
				<ul class="branches">
					{#each branches as item}
						<li>{item.name}</li>
					{:else}
						<li class="text-xs text-gray-500">
							This member does not have any branches
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
	{#if user}
		<div class="flex items-center border-t p-4">
			<a href={`/members/${user.id}`} class="btn variant-filled"> View Profile </a>
			<div class="flex-1"></div>
			<form class="flex items-center gap-4" on:submit={onLogActivity}>
				<select class="select" bind:value={type} name="type" required>
					<option value="login">Member Login</option>
					<option value="logout">Member Logout</option>
				</select>
				<button class="btn variant-filled"> Log Status </button>
			</form>
		</div>
	{/if}
</div>

<style>
	.branches {
		@apply mb-4 ml-6 list-disc text-sm;
	}
</style>
