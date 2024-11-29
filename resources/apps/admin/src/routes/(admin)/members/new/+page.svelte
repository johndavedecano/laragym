<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$lib/api';
	import { getMemberStoreContext } from '$lib/stores/members.store.svelte';
	import { useToast } from '$lib/toast';

	const toast = useToast();

	const store = getMemberStoreContext();

	const title = 'Add Member';

	let loading = $state(false);

	let fields = $state({
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	});

	const onSubmit = (event) => {
		event.preventDefault();

		loading = true;

		store
			.createMember(fields)
			.then(() => {
				goto('/members');
				toast.trigger({
					message: 'Successfully created',
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

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="p-4 lg:max-w-1200 lg:p-6">
	<div class="card bg-white p-4 lg:p-6">
		<header class="card-header mb-6 flex items-center">
			<h3 class="h3">{title}</h3>
			<div class="flex-1"></div>
		</header>
		<form action="" onsubmit={onSubmit}>
			<div class="mb-4">
				<label class="label">
					<span>Name</span>
					<input
						class="input"
						bind:value={fields.name}
						name="name"
						type="text"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						bind:value={fields.email}
						name="email"
						type="email"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Password</span>
					<input
						class="input"
						bind:value={fields.password}
						name="password"
						type="password"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Password Confirmation</span>
					<input
						class="input"
						bind:value={fields.password_confirmation}
						name="password_confirmation"
						type="password"
						required
						disabled={loading}
					/>
				</label>
			</div>

			<div class="flex">
				<button
					type="button"
					onclick={() => goto('/members')}
					class="variant-filled-error btn text-white"
					disabled={loading}>Cancel</button
				>
				<div class="flex-1"></div>
				<button
					type="submit"
					class="variant-filled-primary btn mr-2 text-white"
					disabled={loading}>Submit</button
				>
			</div>
		</form>
	</div>
</div>
