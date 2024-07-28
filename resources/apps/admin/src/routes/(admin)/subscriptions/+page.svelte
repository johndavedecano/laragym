<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { getBearerToken, useApi } from '$lib/api';
	import { onMount } from 'svelte';

	import moment from 'moment';
	import Status from '$lib/components/Status.svelte';
	import EditIcon from 'svelte-icons/fa/FaEdit.svelte';
	import DeleteIcon from 'svelte-icons/fa/FaTrash.svelte';

	const api = useApi({
		Authorization: getBearerToken()
	});

	let items = [];
	let currentPage = 1;
	let loading = false;
	let totalItems = 0;
	let perPage = 15;

	let title = $_('tisubs');

	const onDelete = (id) => {
		const confirm = window.confirm($_('delmessage'));
		if (confirm) {
			items = items.filter((v) => v.id != id);
			totalItems = totalItems - 1;
			api.delete(`/subscriptions/${id}`);
		}
	};

	const onEdit = (id) => goto(`/subscriptions/${id}`);

	const loadItems = () => {
		if (loading) return;
		loading = true;
		api.get('/subscriptions', {
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
				on:click={() => goto('/subscriptions/new')}
			>
				{$_('aditem')}
			</button>
		</header>
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table-hover table bg-white">
				<thead>
					<tr>
						<th>ID</th>
						<th>{$_('nsu')}e</th>
						<th>{$_('esu')}</th>
						<th>{$_('bssu')}</th>
						<th>{$_('sesu')}</th>
						<th>{$_('apsu')}</th>
						<th>{$_('ssu')}</th>
						<th>{$_('asu')}</th>
					</tr>
				</thead>
				<tbody>
					{#each items as item}
						<tr>
							<td>{item.id}</td>
							<td>
								<a href={`/subscriptions/${item.id}`} class="font-bold"
									>{item.user.name}</a
								>
							</td>
							<td>
								{moment(item.expires_at).format('LL')}
							</td>
							<td>
								{item.package.cycle.name}
							</td>
							<td>
								{item.package.services.length}
							</td>
							<td>
								{parseFloat(item.package.amount).toFixed(2)}
							</td>
							<td>
								<Status status={item.status} />
							</td>
							<td>
								<button
									type="button"
									class="btn-icon variant-filled-primary"
									on:click={() => onEdit(item.id)}
								>
									<span class="h-4 w-4 text-white">
										<EditIcon />
									</span>
								</button>
								<button
									type="button"
									class="btn-icon variant-filled-error"
									on:click={() => onDelete(item.id)}
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
						<th colspan="3" class="bg-white">{$_('filen')} {totalItems}</th>
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
</div>
