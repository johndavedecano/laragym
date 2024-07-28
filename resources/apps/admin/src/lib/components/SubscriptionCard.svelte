<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	import FaClock from 'svelte-icons/fa/FaClock.svelte';
	import Status from '$lib/components/Status.svelte';
	import FaTrash from 'svelte-icons/fa/FaTrash.svelte';
	import FaCog from 'svelte-icons/fa/FaCog.svelte';
	import moment from 'moment';

	export let item = {};
	export let action = true;

	const dispatch = createEventDispatcher();
</script>

<div class="card w-full bg-white shadow-lg">
	<header class="card-header subscription-title">
		{item.package.name}<br class="mb-0" />
		<Status status={item.status} />
	</header>
	<section class="p-4">
		<ul class="subscription-services">
			{#if item.package && item.package.services}
				{#each item.package.services as item}
					<li>{item.name}</li>
				{:else}
					<li>{$_('noservsttatchd')}</li>
				{/each}
			{/if}
		</ul>
		<div class="subscription-expires">
			<span class="expire-icon">
				<FaClock />
			</span>
			<div class="flex-1">
				{$_('validuntil')} {moment(item.expires_at).format('LL')}
			</div>
		</div>
		{#if item.status === 'suspended'}
			<div class="subscription-expires mt-2">
				<span class="expire-icon">
					<FaClock />
				</span>
				<div class="flex-1">
					{$_('suspendedat')} {moment(item.suspended_at).format('LL')}
				</div>
			</div>
		{/if}
	</section>
	{#if action}
		<footer class="card-footer flex items-center border-t py-1.5">
			<button type="button" class="btn-icon p-0" on:click={() => dispatch('edit', item)}>
				<span class="text-black-500 h-4 w-4">
					<FaCog />
				</span>
			</button>
			<div class="flex-1"></div>

			<button type="button" class="btn-icon p-0" on:click={() => dispatch('delete', item)}>
				<span class="h-4 w-4 text-red-500">
					<FaTrash />
				</span>
			</button>
		</footer>
	{/if}
</div>

<style>
	.subscription-title {
		@apply mb-2 text-lg font-bold;
	}

	.subscription-services {
		@apply mb-4 ml-6 list-disc text-sm;
	}

	.subscription-expires {
		@apply flex items-center gap-1 text-sm text-gray-600;
	}

	.expire-icon {
		width: 15px;
		height: 15px;
		@apply text-gray-800;
	}
</style>
