<script>
	// @ts-nocheck

	import { useToast } from '$lib/toast';

	import axios from 'axios';

	const toast = useToast();

	let fields = $state({ email: '', password: '' });

	let loading = $state(false);

	const onSubmit = (event) => {
		event.preventDefault();
		if (loading) return;
		axios
			.post('/login', fields)
			.then(() => {
				toast.trigger({
					message: 'You have successfully logged in. Redirecting...',
					background: 'variant-filled-success'
				});
				setTimeout(() => (window.location.href = '/'), 1500);
			})
			.catch((error) => {
				toast.trigger({
					message: 'Unable to logged you in',
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<div class="mb-6">
	<h3 class="h3">Account Login</h3>
	<p>Please login to get started</p>
</div>

<form action="" onsubmit={onSubmit}>
	<div class="mb-4">
		<label class="label">
			<span>Email</span>
			<input
				class="input"
				bind:value={fields.email}
				name="email"
				type="email"
				disabled={loading}
				placeholder="john@doe.com"
				required
			/>
		</label>
	</div>

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
	<button
		type="submit"
		disabled={loading}
		class="variant-filled-primary btn w-full font-bold text-white">Login</button
	>
	<a href="/forgot" class="block pt-2 text-center">Forgot password </a>
</form>
