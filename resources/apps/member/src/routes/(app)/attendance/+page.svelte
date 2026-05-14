<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getAttendance } from '$lib/api/me.js';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import moment from 'moment';

	const toastStore = getToastStore();

	let items = $state([]);
	let loading = $state(true);
	let currentPage = $state(1);
	let totalItems = $state(0);
	let perPage = $state(15);
	let lastPage = $state(1);

	// Month filter — derive from URL search params
	let selectedMonth = $state($page.url.searchParams.get('month') ?? '');

	const totalPages = $derived(lastPage);

	const loadItems = async () => {
		loading = true;
		try {
			const params = {
				page: String(currentPage),
				per_page: String(perPage)
			};
			if (selectedMonth) params.month = selectedMonth;

			const data = await getAttendance(params);
			items = Array.isArray(data) ? data : (data.data ?? []);
			totalItems = data.total ?? items.length;
			lastPage = data.last_page ?? Math.ceil(totalItems / perPage);
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to load attendance.',
				background: 'variant-filled-error'
			});
		} finally {
			loading = false;
		}
	};

	const onMonthChange = () => {
		currentPage = 1;
		const url = new URL(window.location.href);
		if (selectedMonth) {
			url.searchParams.set('month', selectedMonth);
		} else {
			url.searchParams.delete('month');
		}
		goto(url.pathname + url.search, { replaceState: true, noScroll: true });
		loadItems();
	};

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage -= 1;
			loadItems();
		}
	};

	const nextPage = () => {
		if (currentPage < lastPage) {
			currentPage += 1;
			loadItems();
		}
	};

	onMount(() => loadItems());
</script>

<svelte:head>
	<title>Attendance - LaraGym Member</title>
</svelte:head>

<div class="px-4 pb-4 pt-6">
	<h1 class="mb-4 text-2xl font-bold text-white">Attendance</h1>

	<!-- Month filter -->
	<div class="mb-4">
		<label class="label">
			<span class="text-sm text-surface-300">Filter by month</span>
			<input
				type="month"
				class="input mt-1 rounded-lg bg-surface-800 text-white"
				bind:value={selectedMonth}
				onchange={onMonthChange}
			/>
		</label>
	</div>

	<!-- List -->
	{#if loading}
		<SkeletonLoader type="list" count={8} />
	{:else if items.length === 0}
		<div class="card mt-4 rounded-2xl border border-surface-700 bg-surface-800 p-8 text-center">
			<div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-700">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 text-surface-400">
					<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
				</svg>
			</div>
			<p class="font-semibold text-surface-200">No attendance records</p>
			<p class="mt-1 text-sm text-surface-400">
				{selectedMonth ? 'No visits recorded for this month.' : 'No gym visits recorded yet.'}
			</p>
		</div>
	{:else}
		<div class="card overflow-hidden rounded-2xl bg-surface-800">
			{#each items as item, i}
				<div
					class="flex items-center gap-4 px-4 py-3 {i < items.length - 1
						? 'border-b border-surface-700'
						: ''}"
				>
					<!-- Date badge -->
					<div class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-500/20">
						<span class="text-lg font-bold leading-none text-primary-400">
							{moment(item.created_at ?? item.date).format('D')}
						</span>
						<span class="text-xs text-primary-300">
							{moment(item.created_at ?? item.date).format('MMM')}
						</span>
					</div>

					<div class="flex-1 overflow-hidden">
						<p class="truncate font-medium text-white">
							{item.branch?.name ?? item.branch_name ?? 'Gym Visit'}
						</p>
						<p class="text-xs text-surface-400">
							{moment(item.created_at ?? item.date).format('dddd, MMMM D, YYYY')}
						</p>
						{#if item.description}
							<p class="mt-0.5 truncate text-xs text-surface-400">{item.description}</p>
						{/if}
					</div>

					<div class="shrink-0 text-right">
						<span class="text-xs text-surface-400">
							{moment(item.created_at ?? item.date).format('h:mm A')}
						</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Pagination -->
		{#if lastPage > 1}
			<div class="mt-4 flex items-center justify-between">
				<button
					onclick={prevPage}
					disabled={currentPage <= 1}
					class="btn variant-soft rounded-lg disabled:opacity-40"
				>
					&larr; Previous
				</button>
				<span class="text-sm text-surface-300">
					Page {currentPage} of {lastPage}
				</span>
				<button
					onclick={nextPage}
					disabled={currentPage >= lastPage}
					class="btn variant-soft rounded-lg disabled:opacity-40"
				>
					Next &rarr;
				</button>
			</div>
		{/if}
	{/if}
</div>
