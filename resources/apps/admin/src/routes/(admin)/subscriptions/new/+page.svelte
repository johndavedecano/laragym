<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import PackageSelect from '$lib/components/PackageSelect.svelte';
	import UserSelect from '$lib/components/UserSelect.svelte';
	import { useToast } from '$lib/toast';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = $_('tinewsubs');

	let loading = false;

	let fields = {
		package: '',
		user: null,
		interval: ''
	};

	const onSubmit = () => {
		loading = true;
		api.post(`/subscriptions`, {
			package_id: fields.package.id,
			user_id: fields.user.id,
			interval: fields.interval
		})
			.then(() => {
				goto('/subscriptions');
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
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>User</span>
					<UserSelect bind:value={fields.user} />
				</label>
			</div>

			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>{$_('package')}</span>
					<PackageSelect bind:value={fields.package} />
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>{$_('interval')}</span>
					<input
						class="input"
						bind:value={fields.interval}
						name="interval"
						type="number"
						min="1"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					on:click={() => goto('/subscriptions')}
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
