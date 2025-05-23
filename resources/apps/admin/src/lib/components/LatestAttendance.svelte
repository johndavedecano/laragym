<script>
	// @ts-nocheck

	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';
	import moment from 'moment';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getAvatarUrl } from '$lib/avatar';

	let loading = $state(false);

	const api = useApi({
		Authorization: getBearerToken()
	});

	const toast = useToast();

	let items = $state([]);
	let total = $state(0);

	const loadItems = async () => {
		try {
			loading = true;

			const response = await api.get('/activities', {
				params: {
					'filter[type]': 'attendance',
					'filter[entity]': 'user'
				}
			});

			items = response.data.data;
			total = response.data.total;

			loading = false;
		} catch (error) {
			loading = false;
			toast.trigger({
				// @ts-ignore
				message: getErrorMessage(error),
				background: 'variant-filled-error'
			});
		}
	};

	export function reloadItems() {
		loadItems();
	}

	onMount(() => {
		loadItems();
	});
</script>

<div class="card flex-1 flex-col bg-white shadow-lg lg:flex-row">
	<div class="card-header border-b p-4">
		<div class="flex-1 font-bold">Latest Attendance</div>
	</div>
	<div class="card-body p-4">
		<!-- Responsive Container (recommended) -->
		{#if total}
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
						{#each items as item}
							<tr>
								<td>{item.id}</td>
								<td>
									<div class="flex items-center gap-4">
										<Avatar
											src={item.user.avatar
												? getAvatarUrl(item.user.avatar)
												: undefined}
											initials={item.user.avatar
												? undefined
												: item.user.initial}
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
			</div>
		{:else}
			<div class="w-full border bg-gray-100 p-6 text-center font-bold">No items found</div>
		{/if}
	</div>
</div>
