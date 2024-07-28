<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import CycleSelect from '$lib/components/CycleSelect.svelte';
	import ServiceSelect from '$lib/components/ServiceSelect.svelte';
	import { useToast } from '$lib/toast';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = $_('tinpac');

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
		api.post(`/packages`, {
			name: fields.name,
			status: fields.status,
			amount: fields.amount,
			cycle_id: fields.cycle ? fields.cycle.id : null,
			services: fields.services.map((v) => v.id)
		})
			.then(() => {
				goto('/packages');
				toast.trigger({
					message: $_('createdmessage'),
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

	$: console.log(fields);
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
		<form action="" on:submit|preventDefault={onSubmit}>
			<div class="mb-4">
				<label class="label">
					<span>{$_('nsu')}</span>
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
					<span>{$_('amount')}</span>
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
					<span>{$_('ssu')}</span>
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
					<span>{$_('bilcyc')}</span>
					<CycleSelect bind:value={fields.cycle} />
				</label>
			</div>

			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label flex flex-col gap-1">
					<span>{$_('sesu')}</span>
					<ServiceSelect bind:value={fields.services} />
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					on:click={() => goto('/packages')}
					class="btn variant-filled-error text-white"
					disabled={loading}>{$_('canc')}</button
				>
				<div class="flex-1"></div>
				<button
					type="submit"
					class="btn variant-filled-primary mr-2 text-white"
					disabled={loading}>{$_('sub')}</button
				>
			</div>
		</form>
	</div>
</div>
