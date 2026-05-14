<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { getSubscriptions } from '$lib/api/me.js';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import moment from 'moment';

	const toastStore = getToastStore();

	let subscriptions = $state([]);
	let loading = $state(true);

	const getStatusClass = (status) => {
		switch (status?.toLowerCase()) {
			case 'active':
				return 'badge variant-filled-success';
			case 'expired':
				return 'badge variant-filled-error';
			case 'pending':
				return 'badge variant-filled-warning';
			default:
				return 'badge variant-filled-surface';
		}
	};

	onMount(async () => {
		try {
			const data = await getSubscriptions();
			subscriptions = Array.isArray(data) ? data : (data.data ?? []);
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to load subscriptions.',
				background: 'variant-filled-error'
			});
		} finally {
			loading = false;
		}
	});

	const active = $derived(
		subscriptions.find((s) => s.status?.toLowerCase() === 'active') ?? null
	);
	const history = $derived(
		subscriptions.filter((s) => s.status?.toLowerCase() !== 'active')
	);
</script>

<svelte:head>
	<title>Subscriptions - LaraGym Member</title>
</svelte:head>

<div class="px-4 pb-4 pt-6">
	<h1 class="mb-6 text-2xl font-bold text-white">Subscriptions</h1>

	<!-- Current active subscription (highlighted) -->
	<section class="mb-6">
		<h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-surface-400">
			Active Plan
		</h2>

		{#if loading}
			<SkeletonLoader type="card" />
		{:else if active}
			<div class="card rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-5 shadow-lg">
				<div class="mb-4 flex items-start justify-between">
					<div>
						<p class="text-xs text-primary-200">Package</p>
						<p class="text-xl font-bold text-white">
							{active.package?.name ?? active.package_name ?? 'Membership'}
						</p>
					</div>
					<span class={getStatusClass(active.status)}>{active.status}</span>
				</div>

				<div class="grid grid-cols-2 gap-4">
					{#if active.starts_at}
						<div>
							<p class="text-xs text-primary-200">Start Date</p>
							<p class="text-sm font-medium text-white">
								{moment(active.starts_at).format('MMM D, YYYY')}
							</p>
						</div>
					{/if}
					{#if active.expires_at}
						<div>
							<p class="text-xs text-primary-200">Expiry Date</p>
							<p class="text-sm font-medium text-white">
								{moment(active.expires_at).format('MMM D, YYYY')}
							</p>
						</div>
					{/if}
					{#if active.price !== undefined}
						<div>
							<p class="text-xs text-primary-200">Price</p>
							<p class="text-sm font-medium text-white">
								{active.price}
							</p>
						</div>
					{/if}
					{#if active.branch}
						<div>
							<p class="text-xs text-primary-200">Branch</p>
							<p class="text-sm font-medium text-white">
								{active.branch?.name ?? active.branch}
							</p>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div class="card rounded-2xl border border-surface-700 bg-surface-800 p-6 text-center">
				<p class="font-semibold text-surface-200">No Active Subscription</p>
				<p class="mt-1 text-sm text-surface-400">Contact your gym to get a membership plan.</p>
			</div>
		{/if}
	</section>

	<!-- History -->
	<section>
		<h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-surface-400">
			History
		</h2>

		{#if loading}
			<SkeletonLoader type="card" count={3} />
		{:else if history.length === 0}
			<div class="card rounded-2xl border border-surface-700 bg-surface-800 p-6 text-center">
				<p class="text-surface-400">No subscription history yet.</p>
			</div>
		{:else}
			<div class="flex flex-col gap-3">
				{#each history as sub}
					<div class="card rounded-2xl bg-surface-800 p-4">
						<div class="flex items-start justify-between">
							<div>
								<p class="font-semibold text-white">
									{sub.package?.name ?? sub.package_name ?? 'Membership'}
								</p>
								<p class="mt-1 text-xs text-surface-400">
									{#if sub.starts_at}
										{moment(sub.starts_at).format('MMM D, YYYY')}
									{/if}
									{#if sub.starts_at && sub.expires_at}
										&nbsp;→&nbsp;
									{/if}
									{#if sub.expires_at}
										{moment(sub.expires_at).format('MMM D, YYYY')}
									{/if}
								</p>
							</div>
							<span class={getStatusClass(sub.status)}>{sub.status}</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
