<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
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

	export let user_id;

	const toast = useToast();

	const api = useApi({
		Authorization: getBearerToken()
	});

	const modalStore = getModalStore();

	let fields = {
		package: '',
		interval: ''
	};

	let loading = false;

	const onSubmit = () => {
		loading = true;
		api.post(`/subscriptions`, {
			package_id: fields.package.id,
			interval: fields.interval,
			user_id: Number(user_id || $page.params.id)
		})
			.then(() => {
				toast.trigger({
					message: $_('createdmessage'),
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
	<form action="" on:submit|preventDefault={onSubmit} class="flex flex-1 flex-col">
		<ModalHeader>
			<div class="flex-1 font-bold">{$_('membesusadd')}</div>
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
