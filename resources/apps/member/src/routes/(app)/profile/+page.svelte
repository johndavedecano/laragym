<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { getMe, updateMe, updatePassword, uploadAvatar } from '$lib/api/me.js';
	import { authStore } from '$lib/stores/auth.js';
	import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let user = $state(null);
	let loading = $state(true);
	let saving = $state(false);
	let savingPassword = $state(false);
	let uploadingAvatar = $state(false);

	let profileFields = $state({
		contact_number: '',
		address: '',
		city: '',
		state: '',
		country: '',
		postcode: ''
	});

	let passwordFields = $state({
		current_password: '',
		password: '',
		password_confirmation: ''
	});

	let fileInput;

	const getInitials = (name) => {
		if (!name) return '?';
		return name
			.split(' ')
			.map((n) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();
	};

	const getAvatarUrl = (path) => {
		if (!path) return null;
		if (path.startsWith('http')) return path;
		const base = import.meta.env.VITE_API_BASE_URL ?? '';
		return `${base}/storage/${path}`;
	};

	onMount(async () => {
		try {
			const data = await getMe();
			user = data.data ?? data;
			authStore.setUser(user);

			// Populate form fields
			profileFields = {
				contact_number: user.contact_number ?? '',
				address: user.address ?? '',
				city: user.city ?? '',
				state: user.state ?? '',
				country: user.country ?? '',
				postcode: user.postcode ?? ''
			};
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to load profile.',
				background: 'variant-filled-error'
			});
		} finally {
			loading = false;
		}
	});

	const onSaveProfile = async (event) => {
		event.preventDefault();
		if (saving) return;
		saving = true;
		try {
			const data = await updateMe(profileFields);
			user = data.data ?? data;
			authStore.setUser(user);
			toastStore.trigger({
				message: 'Profile updated successfully.',
				background: 'variant-filled-success'
			});
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to update profile.',
				background: 'variant-filled-error'
			});
		} finally {
			saving = false;
		}
	};

	const onSavePassword = async (event) => {
		event.preventDefault();
		if (savingPassword) return;

		if (passwordFields.password !== passwordFields.password_confirmation) {
			toastStore.trigger({
				message: 'Passwords do not match.',
				background: 'variant-filled-error'
			});
			return;
		}

		savingPassword = true;
		try {
			await updatePassword(passwordFields);
			passwordFields = { current_password: '', password: '', password_confirmation: '' };
			toastStore.trigger({
				message: 'Password updated successfully.',
				background: 'variant-filled-success'
			});
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to update password.',
				background: 'variant-filled-error'
			});
		} finally {
			savingPassword = false;
		}
	};

	const onAvatarChange = async (event) => {
		const file = event.target.files?.[0];
		if (!file || !user?.id) return;

		uploadingAvatar = true;
		try {
			const data = await uploadAvatar(user.id, file);
			user = { ...user, ...(data.data ?? data) };
			authStore.setUser(user);
			toastStore.trigger({
				message: 'Avatar updated.',
				background: 'variant-filled-success'
			});
		} catch (err) {
			toastStore.trigger({
				message: err.message ?? 'Failed to upload avatar.',
				background: 'variant-filled-error'
			});
		} finally {
			uploadingAvatar = false;
		}
	};

	const onLogout = () => {
		authStore.logout();
		window.location.href = '/login';
	};
</script>

<svelte:head>
	<title>Profile - LaraGym Member</title>
</svelte:head>

<div class="px-4 pb-4 pt-6">
	<h1 class="mb-6 text-2xl font-bold text-white">Profile</h1>

	<!-- Avatar + basic info -->
	{#if loading}
		<SkeletonLoader type="avatar" class="mb-8" />
	{:else}
		<div class="mb-8 flex flex-col items-center">
			<!-- Avatar -->
			<button
				type="button"
				class="group relative mb-3"
				onclick={() => fileInput?.click()}
				disabled={uploadingAvatar}
				aria-label="Change avatar"
			>
				{#if user?.avatar}
					<img
						src={getAvatarUrl(user.avatar)}
						alt={user.name}
						class="h-20 w-20 rounded-full object-cover ring-2 ring-primary-500"
					/>
				{:else}
					<div
						class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white ring-2 ring-primary-500"
					>
						{getInitials(user?.name)}
					</div>
				{/if}
				<div
					class="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 {uploadingAvatar
						? 'opacity-100'
						: ''}"
				>
					{#if uploadingAvatar}
						<svg class="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="h-5 w-5">
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
					{/if}
				</div>
			</button>
			<input
				bind:this={fileInput}
				type="file"
				accept="image/*"
				class="hidden"
				onchange={onAvatarChange}
			/>

			<h2 class="text-xl font-bold text-white">{user?.name}</h2>
			<p class="text-sm text-surface-300">{user?.email}</p>
			{#if user?.account_number}
				<p class="mt-1 rounded-full bg-surface-700 px-3 py-0.5 text-xs text-surface-300">
					Account: {user.account_number}
				</p>
			{/if}
		</div>
	{/if}

	<!-- Profile edit form -->
	<section class="mb-6">
		<h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-surface-400">
			Personal Details
		</h2>

		{#if loading}
			<SkeletonLoader type="card" />
		{:else}
			<form onsubmit={onSaveProfile} class="card rounded-2xl bg-surface-800 p-4">
				<div class="flex flex-col gap-4">
					<label class="label">
						<span class="text-sm text-surface-200">Contact Number</span>
						<input
							class="input mt-1 rounded-lg"
							type="tel"
							bind:value={profileFields.contact_number}
							placeholder="+1 555 000 0000"
							disabled={saving}
						/>
					</label>

					<label class="label">
						<span class="text-sm text-surface-200">Address</span>
						<input
							class="input mt-1 rounded-lg"
							type="text"
							bind:value={profileFields.address}
							placeholder="123 Main Street"
							disabled={saving}
						/>
					</label>

					<div class="grid grid-cols-2 gap-3">
						<label class="label">
							<span class="text-sm text-surface-200">City</span>
							<input
								class="input mt-1 rounded-lg"
								type="text"
								bind:value={profileFields.city}
								placeholder="City"
								disabled={saving}
							/>
						</label>

						<label class="label">
							<span class="text-sm text-surface-200">State</span>
							<input
								class="input mt-1 rounded-lg"
								type="text"
								bind:value={profileFields.state}
								placeholder="State"
								disabled={saving}
							/>
						</label>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<label class="label">
							<span class="text-sm text-surface-200">Country</span>
							<input
								class="input mt-1 rounded-lg"
								type="text"
								bind:value={profileFields.country}
								placeholder="Country"
								disabled={saving}
							/>
						</label>

						<label class="label">
							<span class="text-sm text-surface-200">Postcode</span>
							<input
								class="input mt-1 rounded-lg"
								type="text"
								bind:value={profileFields.postcode}
								placeholder="00000"
								disabled={saving}
							/>
						</label>
					</div>

					<button
						type="submit"
						disabled={saving}
						class="btn variant-filled-primary w-full rounded-lg font-semibold"
					>
						{#if saving}
							<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
							</svg>
							Saving...
						{:else}
							Save Changes
						{/if}
					</button>
				</div>
			</form>
		{/if}
	</section>

	<!-- Change password -->
	<section class="mb-6">
		<h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-surface-400">
			Change Password
		</h2>

		<form onsubmit={onSavePassword} class="card rounded-2xl bg-surface-800 p-4">
			<div class="flex flex-col gap-4">
				<label class="label">
					<span class="text-sm text-surface-200">Current Password</span>
					<input
						class="input mt-1 rounded-lg"
						type="password"
						bind:value={passwordFields.current_password}
						placeholder="••••••••"
						autocomplete="current-password"
						disabled={savingPassword}
						required
					/>
				</label>

				<label class="label">
					<span class="text-sm text-surface-200">New Password</span>
					<input
						class="input mt-1 rounded-lg"
						type="password"
						bind:value={passwordFields.password}
						placeholder="••••••••"
						autocomplete="new-password"
						disabled={savingPassword}
						required
						minlength="8"
					/>
				</label>

				<label class="label">
					<span class="text-sm text-surface-200">Confirm New Password</span>
					<input
						class="input mt-1 rounded-lg"
						type="password"
						bind:value={passwordFields.password_confirmation}
						placeholder="••••••••"
						autocomplete="new-password"
						disabled={savingPassword}
						required
						minlength="8"
					/>
				</label>

				<button
					type="submit"
					disabled={savingPassword}
					class="btn variant-filled-secondary w-full rounded-lg font-semibold"
				>
					{#if savingPassword}
						<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
						</svg>
						Updating...
					{:else}
						Update Password
					{/if}
				</button>
			</div>
		</form>
	</section>

	<!-- Logout -->
	<section>
		<button
			type="button"
			onclick={onLogout}
			class="btn variant-filled-error w-full rounded-lg font-semibold"
		>
			Sign Out
		</button>
	</section>
</div>
