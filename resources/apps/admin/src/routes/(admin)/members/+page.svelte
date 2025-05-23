<script>
	// @ts-nocheck
	import { Avatar, Paginator } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import Status from '$lib/components/Status.svelte';
	import EditIcon from 'svelte-icons/fa/FaEdit.svelte';
	import DeleteIcon from 'svelte-icons/fa/FaTrash.svelte';
	import { getAvatarUrl } from '$lib/avatar';
	import { getMemberStoreContext } from '$lib/stores/members.store.svelte';

	const store = getMemberStoreContext();

	const title = 'Manage Members';

	const onDelete = (id) => {
		const confirm = window.confirm('are you sure you wanna delete this item?');
		if (confirm) store.deleteMember(id);
	};

	const onEdit = (id) => goto(`/members/${id}`);

	const onAmountChanged = (event) => {
		store.perPage = event.detail;
		store.loadMembers();
	};

	const onPageChanged = (event) => {
		store.currentPage = event.detail;
		store.loadMembers();
	};

	onMount(() => store.loadMembers());

	let paginationSettings = $state({
		page: 0,
		limit: 15,
		size: 0,
		amounts: [5, 10, 15, 20, 40, 60, 100]
	});

	$effect(() => {
		paginationSettings.size = store.totalItems;
	});
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
				class="variant-filled-primary btn text-white"
				onclick={() => goto('/members/new')}
			>
				Add Item
			</button>
		</header>
		<div class="table-container">
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
					{#each store.items as item}
						<tr>
							<td style="width: 100px;">{item.id}</td>
							<td>
								<div class="flex items-center gap-4">
									<Avatar
										src={item.avatar ? getAvatarUrl(item.avatar) : undefined}
										initials={item.avatar ? undefined : item.initial}
										width="w-16"
										rounded="rounded-full"
									/>
									<div class="flex flex-col">
										<a href={`/members/${item.id}`} class="font-bold"
											>{item.name}</a
										>
										<a href="mailto:{item.email}">{item.email}</a>
									</div>
								</div>
							</td>
							<td>
								<Status status={item.status} />
							</td>
							<td>
								<button
									type="button"
									class="variant-filled-primary btn-icon"
									onclick={() => onEdit(item.id)}
								>
									<span class="h-4 w-4 text-white">
										<EditIcon />
									</span>
								</button>
								<button
									type="button"
									class="variant-filled-error btn-icon"
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
						<th colspan="3" class="bg-white">Results Found {store.totalItems}</th>
						<td class="bg-white"></td>
					</tr>
				</tfoot>
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
