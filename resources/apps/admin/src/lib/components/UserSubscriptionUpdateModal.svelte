<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalClose from './ModalClose.svelte';
	import ModalHeader from './ModalHeader.svelte';
	import ModalBody from './ModalBody.svelte';
	import Modal from './Modal.svelte';

	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import PackageSelect from '$lib/components/PackageSelect.svelte';

	import { useToast } from '$lib/toast';
	import ModalFooter from './ModalFooter.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

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
					message: $_('updmessage'),
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
	<form action="" on:submit|preventDefault={onSubmit} class="flex flex-1 flex-col">
		<ModalHeader>
			<div class="flex-1 font-bold">Member Subscription</div>
			<ModalClose on:close={() => modalStore.close()} />
		</ModalHeader>
		<ModalBody>
			<div class="mb-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>{$_('package')}</span>
					<PackageSelect bind:value={fields.package} />
				</label>
			</div>

			<div class="mb-4">
				<label class="label">
					<span>{$_('ssu')}</span>
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
					<span>{$_('interval')}</span>
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
					on:click={() => modalStore.close()}
					class="btn variant-filled-error text-white"
					disabled={loading}>{$_('canc')}</button
				>
				<div class="flex-1"></div>
				<button
					type="submit"
					class="btn variant-filled-primary mr-2 text-white"
					disabled={loading}>{$_('sub')}</button
				>
			</div>
		</ModalFooter>
	</form>
</Modal>
