<script>
	import { getErrorMessage } from '$lib/api';
	import { _ } from 'svelte-i18n';
	import { useToast } from '$lib/toast';

	import axios from 'axios';

	let fields = { email: '', password: '' };

	let loading = false;

	const toast = useToast();

	const onSubmit = () => {
		if (loading) return;
		axios
			.post('/forgot', fields)
			.then(() => {
				toast.trigger({
					message: 'Password reset instruction has been sent. Redirecting...',
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
	<h3 class="h3">{$_('fp')}</h3>
	<p>{$_('re')}</p>
</div>

<form action="" on:submit|preventDefault={onSubmit}>
	<div class="mb-4">
		<label class="label">
			<span>Email</span>
			<input
				class="input"
				bind:value={fields.email}
				name="email"
				type="email"
				placeholder="john@doe.com"
				required
				disabled={loading}
			/>
		</label>
	</div>
	<button
		type="submit"
		disabled={loading}
		class="btn variant-filled-primary w-full font-bold text-white">{$_('sub')}</button
	>
	<a href="/login" class="block pt-2 text-center">{$_('rl')} </a>
</form>
