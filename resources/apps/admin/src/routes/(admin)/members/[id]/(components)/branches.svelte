<script>
	// @ts-nocheck

	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import BranchSelect from '$lib/components/BranchSelect.svelte';
	import { prevent } from '$lib/prevent';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';

	let loading = false;

	let fields = {
		branches: []
	};

	export let user = { id: null };

	const api = useApi({
		Authorization: getBearerToken()
	});

	const toast = useToast();

	const onSubmit = () => {
		loading = true;
		api.post(`/users/${user.id}/branches`, { branches: fields.branches.map((v) => v.id) })
			.then(() => {
				toast.trigger({
					message: 'successfully updated',
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

	const loadItems = () => {
		loading = true;
		api.get(`/users/${user.id}/branches`)
			.then((response) => (fields.branches = response.data))
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
			})
			.finally(() => (loading = false));
	};

	onMount(() => {
		loadItems();
	});
</script>

<div class="flex flex-col">
	<div class="mb-4 flex items-center">
		<h3 class="h3 mb-4">Member Branches</h3>
		<div class="flex-1"></div>
	</div>

	<!-- Responsive Container (recommended) -->
	<form action="" onsubmit={prevent(onSubmit)}>
		<div class="mb-4">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="mb-4 block">Select Branches</span>
				<BranchSelect bind:value={fields.branches} multiple />
			</label>
		</div>

		<div class="flex pt-8">
			<div class="flex-1"></div>
			<button
				type="submit"
				class="btn variant-filled-primary mr-2 text-white"
				disabled={loading}>Submit</button
			>
		</div>
	</form>
</div>
