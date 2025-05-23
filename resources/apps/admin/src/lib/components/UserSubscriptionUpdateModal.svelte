<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Modal from './Modal.svelte';
	import ModalBody from './ModalBody.svelte';
	import ModalClose from './ModalClose.svelte';
	import ModalHeader from './ModalHeader.svelte';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import PackageSelect from '$lib/components/PackageSelect.svelte';
	import { page } from '$app/stores';
	import { prevent } from '$lib/prevent';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';
	import ModalFooter from './ModalFooter.svelte';

	export let user_id;
	export let subscription;

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	const modalStore = getModalStore();

	let fields = {
		package: '',
		interval: '',
		status: 'active'
	};

	let loading = false;

	const onSubmit = () => {
		loading = true;
		api.put(`/subscriptions/${subscription.id}`, {
			package_id: fields.package.id,
			interval: fields.interval,
			user_id: Number(user_id || $page.params.id),
			status: fields.status
		})
			.then(() => {
				toast.trigger({
					message: 'Successfully updated',
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

	onMount(() => {
		fields.package = subscription.package;
		fields.interval = subscription.interval;
		fields.status = subscription.status;
	});
</script>

<Modal>
	<!-- Responsive Container (recommended) -->
	<form action="" onsubmit={prevent(onSubmit)} class="flex flex-1 flex-col">
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
					<span>Status</span>
					<select
						class="select"
						bind:value={fields.status}
						name="status"
						required
						disabled={loading}
					>
						<option value=""></option>
						<option value="active">Active</option>
						<option value="inactive">In-Active</option>
						<option value="cancelled">Cancelled</option>
						<option value="suspended">Suspended</option>
					</select>
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
