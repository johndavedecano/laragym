<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import CycleSelect from '$lib/components/CycleSelect.svelte';
	import ServiceSelect from '$lib/components/ServiceSelect.svelte';
	import { prevent } from '$lib/prevent';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = 'Edit Package';

	let loading = false;

	let fields = {
		name: '',
		status: 'active',
		amount: '',
		cycle: null,
		services: []
	};

	const onSubmit = () => {
		loading = true;
		api.put(`/packages/${$page.params.id}`, {
			name: fields.name,
			status: fields.status,
			amount: fields.amount,
			cycle_id: fields.cycle ? fields.cycle.id : null,
			services: fields.services.map((v) => v.id)
		})
			.then(() => {
				toast.trigger({
					message: 'Successfully updated',
					background: 'variant-filled-success'
				});
			})
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
			})
			.finally(() => (loading = false));
	};

	const loadItem = () => {
		loading = true;
		api.get(`/packages/${$page.params.id}`)
			.then((response) => {
				const value = response.data;
				fields = {
					name: value.name,
					status: value.status,
					amount: value.amount,
					cycle: value.cycle,
					services: value.services
				};
			})
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
				goto('/packages');
			})
			.finally(() => (loading = false));
	};

	onMount(() => {
		loadItem();
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="lg:max-w-1200 p-4 lg:p-6">
	<div class="card bg-white p-4 lg:p-6">
		<header class="card-header mb-6 flex items-center">
			<h3 class="h3">{title}</h3>
			<div class="flex-1"></div>
		</header>
		<!-- Responsive Container (recommended) -->
		<form action="" onsubmit={prevent(onSubmit)}>
			<div class="mb-4">
				<label class="label">
					<span>Name</span>
					<input
						class="input"
						bind:value={fields.name}
						name="name"
						type="text"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Amount</span>
					<input
						class="input"
						bind:value={fields.amount}
						name="amount"
						type="number"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Status</span>
					<select
						class="select"
						bind:value={fields.status}
						name="status"
						required
						disabled={loading}
					>
						<option value=""></option>
						<option value="active">Active</option>
						<option value="inactive">In-Active</option>
					</select>
				</label>
			</div>

			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label flex flex-col gap-1">
					<span>Billing Cycle</span>
					<CycleSelect bind:value={fields.cycle} />
				</label>
			</div>

			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label flex flex-col gap-1">
					<span>Services</span>
					<ServiceSelect bind:value={fields.services} />
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					onclick={() => goto('/packages')}
					class="btn variant-filled-error text-white"
					disabled={loading}>Cancel</button
				>
				<div class="flex-1"></div>
				<button
					type="submit"
					class="btn variant-filled-primary mr-2 text-white"
					disabled={loading}>Submit</button
				>
			</div>
		</form>
	</div>
</div>
