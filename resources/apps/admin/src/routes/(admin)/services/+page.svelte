<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { getBearerToken, useApi } from '$lib/api';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import Status from '$lib/components/Status.svelte';
	import EditIcon from 'svelte-icons/fa/FaEdit.svelte';
	import DeleteIcon from 'svelte-icons/fa/FaTrash.svelte';

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

	let title = 'Manage Services';

	const onDelete = (id) => {
		const confirm = window.confirm('are you sure you wanna delete this item?');
		if (confirm) {
			items = items.filter((v) => v.id != id);
			paginationSettings.size = paginationSettings.size - 1;
			api.delete(`/services/${id}`);
		}
	};

	const onEdit = (id) => goto(`/services/${id}`);

	const loadItems = () => {
		if (loading) return;
		loading = true;
		api.get('/services', {
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

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="p-4 lg:p-6">
	<div class="card bg-white p-4 lg:p-6">
		<header class="card-header mb-6 flex items-center">
			<h3 class="h3">{title}</h3>
			<div class="flex-1"></div>
			<button
				type="submit"
				class="btn variant-filled-primary text-white"
				onclick={() => goto('/services/new')}
			>
				Add Item
			</button>
		</header>
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table-hover table bg-white">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each items as item}
						<tr>
							<td>{item.id}</td>
							<td>
								<a href={`/services/${item.id}`} class="font-bold">{item.name}</a>
							</td>
							<td>
								<Status status={item.status} />
							</td>
							<td>
								<button
									type="button"
									class="btn-icon variant-filled-primary"
									onclick={() => onEdit(item.id)}
								>
									<span class="h-4 w-4 text-white">
										<EditIcon />
									</span>
								</button>
								<button
									type="button"
									class="btn-icon variant-filled-error"
									onclick={() => onDelete(item.id)}
								>
									<span class="h-4 w-4 text-white">
										<DeleteIcon />
									</span>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th colspan="3" class="bg-white">Results Found {paginationSettings.size}</th
						>
						<td class="bg-white"></td>
					</tr>
				</tfoot>
			</table>
			<div class="pt-6">
				<Paginator
					bind:settings={paginationSettings}
					showNumerals
					maxNumerals={1}
					on:amount={(event) => {
						paginationSettings.limit = event.detail;
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
</div>
