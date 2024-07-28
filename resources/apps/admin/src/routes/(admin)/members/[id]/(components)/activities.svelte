<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { getBearerToken, useApi } from '$lib/api';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import moment from 'moment';

	const api = useApi({
		Authorization: getBearerToken()
	});

	let items = [];
	let currentPage = 1;
	let loading = false;
	let totalItems = 0;
	let perPage = 15;

	const loadItems = () => {
		if (loading) return;
		loading = true;
		api.get(`/activities?filter[entity_id]=${$page.params.id}`, {
			params: {
				page: currentPage,
				per_page: perPage
			}
		})
			.then((response) => {
				console.log(response.data);
				items = response.data.data;
				currentPage = response.data.current_page;
				totalItems = response.data.total;
			})
			.finally(() => (loading = false));
	};

	onMount(() => loadItems());

	$: paginationSettings = {
		page: currentPage - 1,
		limit: perPage,
		size: totalItems,
		amounts: [5, 10, 15, 20, 40, 60, 100]
	};
</script>

<div class="flex flex-col">
	<div class="mb-4 flex items-center">
		<h3 class="h3 mb-4">{$_('mactivities')}</h3>
		<div class="flex-1"></div>
	</div>

	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table-hover table bg-white">
			<thead>
				<tr>
					<th>ID</th>
					<th>{$_('desc')}</th>
					<th>{$_('date')}</th>
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
					perPage = event.detail;
					currentPage = 1;
					loadItems();
				}}
				on:page={(event) => {
					currentPage = event.detail + 1;
					loadItems();
				}}
			/>
		</div>
	</div>
</div>
