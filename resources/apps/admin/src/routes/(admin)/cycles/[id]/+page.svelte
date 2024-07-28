<script>
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = $_('tiedbilcyc');

	let loading = false;

	let fields = {
		name: '',
		num_days: '',
		status: 'active',
		description: ''
	};

	const onSubmit = () => {
		loading = true;
		api.put(`/cycles/${$page.params.id}`, fields)
			.then(() => {
				toast.trigger({
					message: $_('updmessage'),
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
		api.get(`/cycles/${$page.params.id}`)
			.then((response) => {
				const value = response.data;
				fields = {
					name: value.name,
					num_days: value.num_days,
					status: value.status,
					description: value.description
				};
			})
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
				goto('/cycles');
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
					<span>{$_('numdays')}</span>
					<input
						class="input"
						bind:value={fields.num_days}
						name="num_days"
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
						<option value="active">{$_('active')}</option>
						<option value="inactive">{$_('inactive')}</option>
					</select>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>{$_('desc')}</span>
					<textarea
						class="textarea"
						rows="4"
						bind:value={fields.description}
						name="description"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					on:click={() => goto('/cycles')}
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
