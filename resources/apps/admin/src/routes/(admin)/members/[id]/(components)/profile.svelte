<script>
	// @ts-nocheck
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { Avatar, FileButton, SlideToggle } from '@skeletonlabs/skeleton';
	import CountrySelect from '$lib/components/CountrySelect.svelte';

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	export let user = { profile: {} };

	let loading = false;

	let fields = {
		name: user.name,
		contact_number: user.profile.contact_number,
		address: user.profile.address,
		city: user.profile.city,
		state: user.profile.state,
		country: user.profile.country,
		postcode: user.profile.postcode,
		email: user.email,
		newsletter: user.profile.newsletter,
		status: user.status
	};

	const onSubmit = () => {
		loading = true;
		api.put(`/users/${user.id}`, {
			...fields,
			country: fields.country && fields.country.code ? fields.country.code : fields.country
		})
			.then(() => {
				toast.trigger({
					message: 'Successfully updated',
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

<h3 class="h3 mb-4">Edit Profile</h3>

<!-- Responsive Container (recommended) -->
<form action="" on:submit|preventDefault={onSubmit}>
	<div class="mb-6 flex items-center gap-4 pt-4">
		<Avatar
			src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
			width="w-24"
			rounded="rounded-full"
		/>
		<FileButton name="files" button="btn btn-sm variant-soft-primary">Change Avatar</FileButton>
	</div>

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

	<div class="mb-4 flex flex-row gap-4">
		<label class="label flex-1">
			<span>Email</span>
			<input
				class="input"
				bind:value={fields.email}
				name="email"
				type="email"
				required
				readonly
				disabled={loading}
			/>
		</label>
		<label class="label flex-1">
			<span>Status</span>
			<select class="select" bind:value={fields.status} name="status" disabled={loading}>
				<option value=""></option>
				<option value="active">Active</option>
				<option value="inactive">In-Active</option>
				<option value="suspended">Suspended</option>
			</select>
		</label>
	</div>

	<div class="mb-4">
		<label class="label">
			<span>Contact Number</span>
			<input
				class="input"
				bind:value={fields.contact_number}
				name="contact_number"
				type="tel"
				required
				disabled={loading}
			/>
		</label>
	</div>

	<div class="mb-4">
		<label class="label">
			<span>Address</span>
			<input
				class="input"
				bind:value={fields.address}
				name="address"
				type="text"
				required
				disabled={loading}
			/>
		</label>
	</div>

	<div class="mb-4 flex flex-row gap-4">
		<label class="label flex-1">
			<span>City</span>
			<input
				class="input"
				bind:value={fields.city}
				name="city"
				type="text"
				required
				disabled={loading}
			/>
		</label>
		<label class="label flex-1">
			<span>State</span>
			<input
				class="input"
				bind:value={fields.state}
				name="state"
				type="text"
				required
				disabled={loading}
			/>
		</label>
	</div>

	<div class="mb-4 flex flex-row gap-4">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label flex-1">
			<span>Country</span>
			<CountrySelect bind:value={fields.country} />
		</label>
		<label class="label flex-1">
			<span>Postcode</span>
			<input
				class="input"
				bind:value={fields.postcode}
				name="postcode"
				type="text"
				required
				disabled={loading}
			/>
		</label>
	</div>

	<SlideToggle name="slider-label" bind:checked={fields.newsletter}
		>Subscribe to Newsletter</SlideToggle
	>

	<div class="flex pt-8">
		<button type="reset" class="btn variant-filled-error text-white" disabled={loading}
			>Reset</button
		>
		<div class="flex-1"></div>
		<button type="submit" class="btn variant-filled-primary mr-2 text-white" disabled={loading}
			>Submit</button
		>
	</div>
</form>
