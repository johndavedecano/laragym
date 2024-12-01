<script>
	// @ts-nocheck
	import { getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';

	const api = useApi();
	const toast = useToast();

	const { data = { email: '', token: '' } } = $props();

	let fields = $state({ password: '', password_confirmation: '' });

	let loading = $state(false);

	const onSubmit = (event) => {
		event.preventDefault();

		if (loading) return;

		api.post('/auth/reset', {
			email: data.email,
			token: data.token,
			password: fields.password,
			password_confirmation: fields.password_confirmation
		})
			.then(() => {
				toast.trigger({
					message: 'You have successfully reset your password. Redirecting...',
					background: 'variant-filled-success'
				});
				setTimeout(() => (window.location.href = '/'), 1000);
			})
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<div class="mb-6">
	<h3 class="h3">Reset Password</h3>
	<p>Use the form below to reset your password</p>
</div>

<form action="" onsubmit={onSubmit}>
	<div class="mb-6">
		<label class="label">
			<span>Password</span>
			<input
				class="input"
				bind:value={fields.password}
				name="password"
				type="password"
				placeholder=""
				disabled={loading}
				required
			/>
		</label>
	</div>
	<div class="mb-6">
		<label class="label">
			<span>Password Confirmation</span>
			<input
				class="input"
				bind:value={fields.password_confirmation}
				name="password_confirmation"
				type="password"
				placeholder=""
				disabled={loading}
				required
			/>
		</label>
	</div>
	<button
		type="submit"
		disabled={loading}
		class="variant-filled-primary btn w-full font-bold text-white">Reset Password</button
	>
	<a href="/login" class="block pt-2 text-center">Back to login </a>
</form>
