<script>
	// @ts-nocheck
	import { register } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let fields = $state({
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	});
	let loading = $state(false);
	let error = $state('');

	const onSubmit = async (event) => {
		event.preventDefault();
		if (loading) return;

		if (fields.password !== fields.password_confirmation) {
			error = 'Passwords do not match.';
			return;
		}

		loading = true;
		error = '';

		try {
			await register(fields);
			toastStore.trigger({
				message: 'Account created! Please sign in.',
				background: 'variant-filled-success'
			});
			goto('/login');
		} catch (err) {
			error = err.message ?? 'Registration failed. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Register - LaraGym Member</title>
</svelte:head>

<h2 class="mb-1 text-xl font-bold text-white">Create Account</h2>
<p class="mb-6 text-sm text-surface-300">Join LaraGym and manage your membership.</p>

{#if error}
	<div class="alert variant-filled-error mb-4 rounded-lg p-3 text-sm">
		{error}
	</div>
{/if}

<form onsubmit={onSubmit} class="flex flex-col gap-4">
	<label class="label">
		<span class="text-sm text-surface-200">Full Name</span>
		<input
			class="input mt-1 rounded-lg"
			type="text"
			name="name"
			bind:value={fields.name}
			placeholder="John Doe"
			autocomplete="name"
			disabled={loading}
			required
		/>
	</label>

	<label class="label">
		<span class="text-sm text-surface-200">Email</span>
		<input
			class="input mt-1 rounded-lg"
			type="email"
			name="email"
			bind:value={fields.email}
			placeholder="you@example.com"
			autocomplete="email"
			disabled={loading}
			required
		/>
	</label>

	<label class="label">
		<span class="text-sm text-surface-200">Password</span>
		<input
			class="input mt-1 rounded-lg"
			type="password"
			name="password"
			bind:value={fields.password}
			placeholder="••••••••"
			autocomplete="new-password"
			disabled={loading}
			required
			minlength="8"
		/>
	</label>

	<label class="label">
		<span class="text-sm text-surface-200">Confirm Password</span>
		<input
			class="input mt-1 rounded-lg"
			type="password"
			name="password_confirmation"
			bind:value={fields.password_confirmation}
			placeholder="••••••••"
			autocomplete="new-password"
			disabled={loading}
			required
			minlength="8"
		/>
	</label>

	<button
		type="submit"
		disabled={loading}
		class="btn variant-filled-primary w-full rounded-lg font-semibold"
	>
		{#if loading}
			<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
			</svg>
			Creating account...
		{:else}
			Create Account
		{/if}
	</button>
</form>

<p class="mt-4 text-center text-sm text-surface-300">
	Already have an account?
	<a href="/login" class="font-medium text-primary-400 hover:text-primary-300">Sign In</a>
</p>
