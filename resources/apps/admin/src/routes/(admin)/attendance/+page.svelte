<script>
	// @ts-nocheck
	import moment from 'moment';

	import { Avatar, Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { getAvatarUrl } from '$lib/avatar';
	import { getAttendanceStoreContext } from '$lib/stores/attendance.store.svelte';

	const store = getAttendanceStoreContext();

	let title = 'Member Attedance';

	const onAmountChanged = (event) => {
		store.perPage = event.detail;
		store.loadItems();
	};

	const onPageChanged = (event) => {
		store.currentPage = event.detail;
		store.loadItems();
	};

	let paginationSettings = $state({
		page: 0,
		limit: 15,
		size: 0,
		amounts: [5, 10, 15, 20, 40, 60, 100]
	});

	$effect(() => {
		paginationSettings.currentPage = store.currentPage - 1;
		paginationSettings.perPage = store.perPage;
		paginationSettings.size = store.totalItems;
	});

	onMount(() => store.loadItems());
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="p-4 lg:p-6">
	<div class="card bg-white p-4 lg:p-6">
		<header class="card-header mb-6 flex items-center">
			<h3 class="h3">{title}</h3>
			<div class="flex-1"></div>
		</header>
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table-hover table bg-white">
				<thead>
					<tr>
						<th>ID</th>
						<th>Member</th>
						<th>Description</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{#each store.items as item}
						<tr>
							<td>{item.id}</td>
							<td>
								<div class="flex items-center gap-4">
									<Avatar
										src={item.user.avatar
											? getAvatarUrl(item.user.avatar)
											: undefined}
										initials={item.user.avatar ? undefined : item.user.initial}
										width="w-10"
										rounded="rounded-full"
									/>
									<div class="flex flex-col">
										<a href={`/members/${item.user.id}`} class="font-bold"
											>{item.user.name}</a
										>
										<a href="mailto:{item.user.email}">{item.user.email}</a>
									</div>
								</div>
							</td>
							<td>
								{item.description}
							</td>
							<td>
								{moment(item.created_at).format('LL')}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="pt-6">
				<Paginator
					bind:settings={paginationSettings}
					showNumerals
					maxNumerals={1}
					on:amount={onAmountChanged}
					on:page={onPageChanged}
				/>
			</div>
		</div>
	</div>
</div>
