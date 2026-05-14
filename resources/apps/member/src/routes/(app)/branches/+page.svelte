<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { getBranches } from '$lib/api/branches.js';
	import { getMe } from '$lib/api/me.js';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let branches = $state([]);
	let memberBranchIds = $state(new Set());
	let loading = $state(true);

	onMount(async () => {
		try {
			const [branchData, meData] = await Promise.all([getBranches(), getMe()]);

			branches = Array.isArray(branchData) ? branchData : (branchData.data ?? []);

			const me = meData.data ?? meData;
			// Collect branch IDs from member's subscriptions or branches array
			const ids = new Set();
			if (Array.isArray(me.branches)) {
				me.branches.forEach((b) => ids.add(b.id ?? b));
			}
			if (Array.isArray(me.subscriptions)) {
				me.subscriptions.forEach((s) => {
					if (s.branch_id) ids.add(s.branch_id);
					if (s.branch?.id) ids.add(s.branch.id);
				});
			}
			memberBranchIds = ids;
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to load branches.',
				background: 'variant-filled-error'
			});
		} finally {
			loading = false;
		}
	});

	const isMemberBranch = (branch) => memberBranchIds.has(branch.id);
</script>

<svelte:head>
	<title>Branches - LaraGym Member</title>
</svelte:head>

<div class="px-4 pb-4 pt-6">
	<h1 class="mb-6 text-2xl font-bold text-white">Gym Branches</h1>

	{#if loading}
		<SkeletonLoader type="card" count={4} class="mb-3" />
	{:else if branches.length === 0}
		<div class="card rounded-2xl border border-surface-700 bg-surface-800 p-8 text-center">
			<p class="font-semibold text-surface-200">No branches found</p>
			<p class="mt-1 text-sm text-surface-400">Please check back later.</p>
		</div>
	{:else}
		<div class="flex flex-col gap-3">
			{#each branches as branch}
				{@const mine = isMemberBranch(branch)}
				<div
					class="card rounded-2xl p-4 {mine
						? 'border border-primary-500 bg-surface-800'
						: 'border border-surface-700 bg-surface-800'}"
				>
					<div class="flex items-start gap-3">
						<!-- Icon -->
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full {mine
								? 'bg-primary-500/20'
								: 'bg-surface-700'}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-5 w-5 {mine ? 'text-primary-400' : 'text-surface-400'}"
							>
								<path
									fill-rule="evenodd"
									d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h-2v2h2V5zm0 4h-2v2h2V9z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>

						<div class="flex-1">
							<div class="flex items-center gap-2">
								<h3 class="font-semibold text-white">{branch.name}</h3>
								{#if mine}
									<span class="badge variant-filled-primary text-xs">Your Branch</span>
								{/if}
							</div>

							{#if branch.address}
								<p class="mt-1 text-sm text-surface-300">{branch.address}</p>
							{/if}

							{#if branch.city || branch.state}
								<p class="text-sm text-surface-400">
									{[branch.city, branch.state].filter(Boolean).join(', ')}
								</p>
							{/if}

							{#if branch.phone}
								<a
									href="tel:{branch.phone}"
									class="mt-1 block text-sm text-primary-400 hover:text-primary-300"
								>
									{branch.phone}
								</a>
							{/if}

							{#if branch.email}
								<a
									href="mailto:{branch.email}"
									class="block text-sm text-primary-400 hover:text-primary-300"
								>
									{branch.email}
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
