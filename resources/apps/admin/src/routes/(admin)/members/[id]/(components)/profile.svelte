<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { SlideToggle } from '@skeletonlabs/skeleton';
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
		newsletter: user.profile.newsletter
	};

	const onSubmit = () => {
		loading = true;
		api.put(`/users/${user.id}`, {
			...fields,
			country: fields.country && fields.country.code ? fields.country.code : fields.country
		})
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

	$: console.log(fields);
</script>

<h3 class="h3 mb-4">Edit Profile</h3>

<!-- Responsive Container (recommended) -->
<form action="" on:submit|preventDefault={onSubmit}>
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
				readonly
				disabled={loading}
			/>
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
