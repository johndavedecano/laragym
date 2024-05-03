<script>
	import { goto } from '$app/navigation';

	import axios from 'axios';

	let fields = { email: '', password: '' };

	let loading = false;

	const onSubmit = () => {
		axios
			.post('/login', fields)
			.then((response) => {
				goto('/');
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<div class="mb-6">
	<h2 class="h2">Admin Login</h2>
	<p>Please login to get started</p>
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

	<div class="mb-6">
		<label class="label">
			<span>Password</span>
			<input
				class="input"
				bind:value={fields.password}
				name="password"
				type="password"
				placeholder=""
				required
			/>
		</label>
	</div>
	<button type="submit" class="btn variant-filled-primary w-full">Login</button>
	<a href="/forgot" class="block pt-2 text-center">Forgot password </a>
</form>
