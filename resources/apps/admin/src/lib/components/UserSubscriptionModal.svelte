<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalClose from './ModalClose.svelte';
	import ModalHeader from './ModalHeader.svelte';
	import ModalBody from './ModalBody.svelte';
	import Modal from './Modal.svelte';
	import { goto } from '$app/navigation';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import PackageSelect from '$lib/components/PackageSelect.svelte';
	import { useToast } from '$lib/toast';
	import ModalFooter from './ModalFooter.svelte';
	import { page } from '$app/stores';

	let { user_id } = $props();

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	const modalStore = getModalStore();

	let fields = $state({
		package: '',
		interval: ''
	});

	let loading = $state(false);

	const onSubmit = (event) => {
		event.preventDefault();

		loading = true;

		api.post(`/subscriptions`, {
			package_id: fields.package.id,
			interval: fields.interval,
			user_id: Number(user_id || $page.params.id)
		})
			.then(() => {
				toast.trigger({
					message: 'Successfully created',
					background: 'variant-filled-success'
				});
				window.dispatchEvent(new CustomEvent('user_subscription'));
				modalStore.close();
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

<Modal>
	<!-- Responsive Container (recommended) -->
	<form action="" onsubmit={onSubmit} class="flex flex-1 flex-col">
		<ModalHeader>
			<div class="flex-1 font-bold">Member Subscription</div>
			<ModalClose onClose={() => modalStore.close()} />
		</ModalHeader>
		<ModalBody>
			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Package</span>
					<PackageSelect bind:value={fields.package} />
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>Interval</span>
					<input
						class="input"
						bind:value={fields.interval}
						name="interval"
						type="number"
						min="1"
						required
						disabled={loading}
					/>
				</label>
			</div>
		</ModalBody>
		<ModalFooter>
			<div class="flex w-full">
				<button
					type="button"
					onclick={() => modalStore.close()}
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
		</ModalFooter>
	</form>
</Modal>
