<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import PackageSelect from '$lib/components/PackageSelect.svelte';
	import UserSelect from '$lib/components/UserSelect.svelte';
	import { prevent } from '$lib/prevent';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	const title = 'Edit Subscription';

	let loading = $state(false);

	let fields = $state({
		package: '',
		user: null,
		interval: '',
		status: 'active'
	});

	const onSubmit = () => {
		loading = true;
		api.put(`/subscriptions/${$page.params.id}`, {
			package_id: fields.package.id,
			user_id: fields.user.id,
			status: fields.status,
			interval: fields.interval
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
		api.get(`/subscriptions/${$page.params.id}`)
			.then((response) => {
				const value = response.data;
				fields = {
					package: value.package,
					user: value.user,
					interval: value.interval,
					status: value.status
				};
			})
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
				goto('/subscriptions');
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
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>User</span>
					<UserSelect bind:value={fields.user} />
				</label>
			</div>

			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Package</span>
					<PackageSelect bind:value={fields.package} />
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Interval</span>
					<input
						class="input"
						bind:value={fields.interval}
						name="interval"
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
						<option value="suspended">Suspended</option>
					</select>
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					onclick={() => goto('/subscriptions')}
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
