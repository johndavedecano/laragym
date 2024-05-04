<script>
	import { goto } from '$app/navigation';

	let title = 'Add Package';

	let fields = {};

	const onSubmit = () => {};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="p-4 lg:p-6">
	<div class="card bg-white p-4 lg:p-6">
		<header class="card-header mb-6 flex items-center">
			<h3 class="h3">{title}</h3>
			<div class="flex-1"></div>
		</header>
		<!-- Responsive Container (recommended) -->
		<form action="" on:submit|preventDefault={onSubmit}>
			<div class="mb-4">
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						bind:value={fields.name}
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
	</div>
</div>
