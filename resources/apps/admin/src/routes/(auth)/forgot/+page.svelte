<script>
	import { goto } from '$app/navigation';

	import axios from 'axios';

	let fields = { email: '', password: '' };

	let loading = false;

	const onSubmit = () => {
		axios
			.post('/forgot', fields)
			.then((response) => {
				goto('/login');
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<div class="mb-6">
	<h2 class="h2">Forgot Password</h2>
	<p>Please provide your email to reset your password.</p>
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
			/>
		</label>
	</div>
	<button type="submit" class="btn variant-filled-primary w-full">Submit</button>
	<a href="/login" class="block pt-2 text-center">Back to login </a>
</form>
