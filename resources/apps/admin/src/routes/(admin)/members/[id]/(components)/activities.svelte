<script>
	// @ts-nocheck
	import { Paginator } from '@skeletonlabs/skeleton';
	import { getBearerToken, useApi } from '$lib/api';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import moment from 'moment';

	const api = useApi({
		Authorization: getBearerToken()
	});

	let items = $state([]);
	let loading = $state(false);

	let paginationSettings = $state({
		page: 0,
		limit: 15,
		size: 0,
		amounts: [5, 10, 15, 20, 40, 60, 100]
	});

	const loadItems = () => {
		if (loading) return;
		loading = true;
		api.get(`/activities?filter[entity_id]=${$page.params.id}`, {
			params: {
				page: paginationSettings.page + 1,
				per_page: paginationSettings.limit
			}
		})
			.then((response) => {
				items = response.data.data;
				paginationSettings.size = response.data.total;
			})
			.finally(() => (loading = false));
	};

	onMount(() => loadItems());
</script>

<div class="flex flex-col">
	<div class="mb-4 flex items-center">
		<h3 class="h3 mb-4">Member Activities</h3>
		<div class="flex-1"></div>
	</div>

	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table-hover table bg-white">
			<thead>
				<tr>
					<th>ID</th>
					<th>Description</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item}
					<tr>
						<td>{item.id}</td>
						<td style="width:70%">{item.description}</td>
						<td>
							{moment(item.created_at).format('LLLL')}
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
				on:amount={(event) => {
					paginationSettings.limit = event.detail;
					paginationSettings.page = 1;
					loadItems();
				}}
				on:page={(event) => {
					paginationSettings.page = event.detail;
					loadItems();
				}}
			/>
		</div>
	</div>
</div>
