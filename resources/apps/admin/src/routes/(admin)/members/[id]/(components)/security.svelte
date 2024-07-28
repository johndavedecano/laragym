<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	export let user = { profile: {} };

	let loading = false;

	let fields = {
		password: '',
		password_confirmation: ''
	};

	const onSubmit = () => {
		loading = true;
		api.put(`/users/${user.id}`, fields)
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
</script>

<h3 class="h3 mb-4">{$_('sandp')}</h3>

<!-- Responsive Container (recommended) -->
<form action="" on:submit|preventDefault={onSubmit}>
	<div class="mb-4">
		<label class="label">
			<span>{$_('psw')}</span>
			<input
				class="input"
				bind:value={fields.password}
				name="password"
				type="password"
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
				disabled={loading}
			/>
		</label>
	</div>

	<div class="flex pt-8">
		<div class="flex-1"></div>
		<button type="submit" class="btn variant-filled-primary mr-2 text-white" disabled={loading}
			>{$_('sub')}</button
		>
	</div>
</form>
