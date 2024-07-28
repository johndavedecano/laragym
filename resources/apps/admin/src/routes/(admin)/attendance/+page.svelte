<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { Avatar, Paginator } from '@skeletonlabs/skeleton';
	import { getBearerToken, useApi } from '$lib/api';
	import { onMount } from 'svelte';

	import moment from 'moment';
	import { getAvatarUrl } from '$lib/avatar';

	const api = useApi({
		Authorization: getBearerToken()
	});

	let items = [];
	let currentPage = 1;
	let loading = false;
	let totalItems = 0;
	let perPage = 15;

	let title = $_('tiatt');

	const loadItems = () => {
		if (loading) return;
		loading = true;
		api.get('/activities', {
			params: {
				page: currentPage,
				per_page: perPage,
				'filter[type]': 'attendance',
				'filter[entity]': 'user'
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
		</header>
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table-hover table bg-white">
				<thead>
					<tr>
						<th>ID</th>
						<th>{$_('member')}</th>
						<th>{$_('desc')}</th>
						<th>{$_('date')}</th>
					</tr>
				</thead>
				<tbody>
					{#each items as item}
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
