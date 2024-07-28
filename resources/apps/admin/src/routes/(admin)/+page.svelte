<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import { getBearerToken, getErrorMessage, useApi } from '$lib/api';

	import StatisticsCard from '$lib/components/StatisticsCard.svelte';
	import SubscriptionIcon from 'svelte-icons/fa/FaCreditCard.svelte';
	import ServicesIcon from 'svelte-icons/fa/FaServer.svelte';
	import PackagesIcon from 'svelte-icons/fa/FaBox.svelte';
	import MembersIcon from 'svelte-icons/fa/FaUsers.svelte';
	import { useToast } from '$lib/toast';
	import { onMount } from 'svelte';
	import LatestActivities from '$lib/components/LatestActivities.svelte';
	import LatestAttendance from '$lib/components/LatestAttendance.svelte';
	import MemberLogin from '$lib/components/MemberLogin.svelte';

	let loading = false;
	let attendance;

	const api = useApi({
		Authorization: getBearerToken()
	});

	const toast = useToast();

	let stats = {
		subscriptions: 0,
		services: 0,
		packages: 0,
		members: 0
	};

	const loadItems = async () => {
		try {
			loading = true;

			const [subscriptions, services, packages, members] = await Promise.all([
				api.get('/stats/subscriptions'),
				api.get('/stats/services'),
				api.get('/stats/packages'),
				api.get('/stats/members')
			]);

			stats = {
				subscriptions: subscriptions.data,
				services: services.data,
				packages: packages.data,
				members: members.data
			};

			loading = false;
		} catch (error) {
			loading = false;
			toast.trigger({
				// @ts-ignore
				message: getErrorMessage(error),
				background: 'variant-filled-error'
			});
		}
	};

	const onReloadAttenance = () => attendance.reloadItems();

	onMount(() => {
		loadItems();
	});
</script>

<div class="flex flex-col gap-6 p-6">
	<div class="statistics">
		<StatisticsCard
			href="/subscriptions"
			icon={SubscriptionIcon}
			value={stats.subscriptions}
			title={$_('ts')}
		/>
		<StatisticsCard
			href="/services"
			icon={ServicesIcon}
			value={stats.services}
			title={$_('tse')}
		/>
		<StatisticsCard
			href="/packages"
			icon={PackagesIcon}
			value={stats.packages}
			title={$_('tp')}
		/>
		<StatisticsCard
			href="/members"
			icon={MembersIcon}
			value={stats.members}
			title={$_('tme')}
		/>
	</div>
	<div class="flex flex-col gap-6 lg:flex-row">
		<LatestActivities />
		<div class="flex flex-1 flex-col gap-6">
			<MemberLogin on:load={onReloadAttenance} />
			<LatestAttendance bind:this={attendance} />
		</div>
	</div>
</div>

<style>
	.statistics {
		@apply grid grid-cols-1 gap-6 lg:grid-cols-4;
	}
</style>
