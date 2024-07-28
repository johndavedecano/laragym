<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
	import { useToast } from '$lib/toast';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import UserSubscriptionModal from '$lib/components/UserSubscriptionModal.svelte';
	import SubscriptionCard from '$lib/components/SubscriptionCard.svelte';
	import SubscriptionList from '$lib/components/SubscriptionList.svelte';
	import UserSubscriptionUpdateModal from '$lib/components/UserSubscriptionUpdateModal.svelte';

	let subscriptions = [];
	let loading = false;

	const api = useApi({
		Authorization: getBearerToken()
	});

	const toast = useToast();

	const modalStore = getModalStore();

	const loadItems = () => {
		loading = true;
		api.get(`/subscriptions?user_id=${$page.params.id}`)
			.then((response) => (subscriptions = response.data))
			.catch((error) => {
				toast.trigger({
					message: getErrorMessage(error),
					background: 'variant-filled-error'
				});
			})
			.finally(() => (loading = false));
	};

	const onAddSubscription = () => {
		const modalComponent = { ref: UserSubscriptionModal };

		const modal = {
			type: 'component',
			component: modalComponent,
			props: {
				user_id: $page.params.id
			}
		};

		modalStore.trigger(modal);
	};

	onMount(() => {
		loadItems();
		window.addEventListener('user_subscription', loadItems);
	});

	onDestroy(() => {
		window.removeEventListener('user_subscription', loadItems);
	});

	const onEdit = (item) => {
		const modalComponent = {
			ref: UserSubscriptionUpdateModal,
			props: {
				user_id: $page.params.id,
				subscription: item
			}
		};

		const modal = {
			type: 'component',
			component: modalComponent
		};

		modalStore.trigger(modal);
	};

	const onConfirmDelete = async (item) => {
		try {
			subscriptions = subscriptions.filter((v) => v.id != item.id);

			await api.delete(`/subscriptions/${item.id}`);

			toast.trigger({
				message: 'Subscription was successfully deleted',
				background: 'variant-filled-success'
			});
		} catch (error) {
			toast.trigger({
				message: getErrorMessage(error),
				background: 'variant-filled-error'
			});
		}
	};

	const onDelete = (item) => {
		const modal = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: 'Are you sure you wish to proceed?',
			response: (r) => onConfirmDelete(item)
		};
		modalStore.trigger(modal);
	};
</script>

<div class="flex flex-col">
	<div class="mb-4 flex items-center">
		<h3 class="h3 mb-4">{$_('msuscrips')}</h3>
		<div class="flex-1"></div>
		<a href="/" on:click|preventDefault={onAddSubscription} class="btn variant-filled">
			{$_('adsubs')}
		</a>
	</div>

	<SubscriptionList>
		{#each subscriptions as item}
			<SubscriptionCard
				{item}
				on:delete={() => onDelete(item)}
				on:edit={() => onEdit(item)}
			/>
		{/each}
	</SubscriptionList>
</div>
