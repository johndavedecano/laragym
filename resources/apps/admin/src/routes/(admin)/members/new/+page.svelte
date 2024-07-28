<script>
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	let title = $_('tiadmem');

	let loading = false;

	let fields = {
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	};

	const onSubmit = () => {
		loading = true;
		api.post('/users', fields)
			.then(() => {
				goto('/members');
				toast.trigger({
					message: 'Successfully created',
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
					<span>Email</span>
					<input
						class="input"
						bind:value={fields.email}
						name="email"
						type="email"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>{$_('psw')}</span>
					<input
						class="input"
						bind:value={fields.password}
						name="password"
						type="password"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>{$_('pswc')}</span>
					<input
						class="input"
						bind:value={fields.password_confirmation}
						name="password_confirmation"
						type="password"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					on:click={() => goto('/members')}
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
