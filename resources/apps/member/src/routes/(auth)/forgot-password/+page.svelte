<script>
	// @ts-nocheck
	import { forgotPassword } from '$lib/api/auth.js';

	let email = $state('');
	let loading = $state(false);
	let error = $state('');
	let success = $state(false);

	const onSubmit = async (event) => {
		event.preventDefault();
		if (loading) return;

		loading = true;
		error = '';

		try {
			await forgotPassword({ email });
			success = true;
		} catch (err) {
			error = err.message ?? 'Unable to send reset email. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Forgot Password - LaraGym Member</title>
</svelte:head>

<h2 class="mb-1 text-xl font-bold text-white">Forgot Password</h2>
<p class="mb-6 text-sm text-surface-300">
	Enter your email and we'll send you a link to reset your password.
</p>

{#if success}
	<div class="alert variant-filled-success rounded-lg p-4 text-sm">
		<p class="font-semibold">Check your inbox!</p>
		<p class="mt-1 text-surface-100">
			If an account exists for <strong>{email}</strong>, you'll receive a password reset link
			shortly.
		</p>
	</div>
	<a href="/login" class="btn variant-soft mt-4 w-full rounded-lg"> Back to Sign In </a>
{:else}
	{#if error}
		<div class="alert variant-filled-error mb-4 rounded-lg p-3 text-sm">
			{error}
		</div>
	{/if}

	<form onsubmit={onSubmit} class="flex flex-col gap-4">
		<label class="label">
			<span class="text-sm text-surface-200">Email</span>
			<input
				class="input mt-1 rounded-lg"
				type="email"
				name="email"
				bind:value={email}
				placeholder="you@example.com"
				autocomplete="email"
				disabled={loading}
				required
			/>
		</label>

		<button
			type="submit"
			disabled={loading}
			class="btn variant-filled-primary w-full rounded-lg font-semibold"
		>
			{#if loading}
				<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
				</svg>
				Sending...
			{:else}
				Send Reset Link
			{/if}
		</button>
	</form>

	<a href="/login" class="mt-4 block text-center text-sm text-primary-400 hover:text-primary-300">
		Back to Sign In
	</a>
{/if}
