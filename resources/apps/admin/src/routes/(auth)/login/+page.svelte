<script>

	import { _ } from 'svelte-i18n';

	import { useToast } from '$lib/toast';

	import axios from 'axios';

	const toast = useToast();

	let fields = { email: '', password: '' };

	let loading = false;

	const onSubmit = () => {
		if (loading) return;
		axios
			.post('/login', fields)
			.then(() => {
				toast.trigger({
					message: $_('loginsuc'),
					background: 'variant-filled-success'
				});
				setTimeout(() => (window.location.href = '/'), 1000);
			})
			.catch((error) => {
				toast.trigger({
					message: $_('loginfail'),
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				loading = false;
			});
	};

</script>

<div class="mb-6">
	<h3 class="h3">{$_('accountlogin')}</h3>
	<p> {$_('ban') }</p>
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
				disabled={loading}
				placeholder="john@doe.com"
				required
			/>
		</label>
	</div>

	<div class="mb-6">
		<label class="label">
			<span>{$_('psw')}</span>
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
		class="btn variant-filled-primary w-full font-bold text-white">{$_('loin')}</button
	>
	<a href="/forgot" class="block pt-2 text-center">{$_('fp')} </a>
</form>
