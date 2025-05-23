<script>
	// @ts-nocheck
	import Dashboard from 'svelte-icons/fa/FaHome.svelte';
	import Activities from 'svelte-icons/fa/FaUserClock.svelte';
	import Attendance from 'svelte-icons/fa/FaCalendar.svelte';
	import Members from 'svelte-icons/fa/FaUsers.svelte';
	import Subscriptions from 'svelte-icons/fa/FaCreditCard.svelte';
	import Packages from 'svelte-icons/fa/FaBox.svelte';
	import Services from 'svelte-icons/fa/FaServer.svelte';
	import Cycles from 'svelte-icons/fa/FaCalendarPlus.svelte';
	import Logout from 'svelte-icons/fa/FaSignOutAlt.svelte';
	import Branches from 'svelte-icons/fa/FaBuilding.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const drawerStore = getDrawerStore();

	let active = $state($page.url.pathname);

	const drawerClose = (path) => {
		active = path;
		drawerStore.close();
	};

	const isActive = (value, current) => {
		if (current === '/' && value === current) return 'active';
		if (current && current.startsWith(value) && value !== '/') return 'active';
	};

	let items = $derived.by(() =>
		[
			{
				path: '/',
				name: 'Dashboard',
				icon: Dashboard
			},
			{
				path: '/activities',
				name: 'Activities',
				icon: Activities
			},
			{
				path: '/attendance',
				name: 'Attendance',
				icon: Attendance
			},
			{
				path: '/members',
				name: 'Members',
				icon: Members
			},
			{
				path: '/branches',
				name: 'Branches',
				icon: Branches
			},
			{
				path: '/subscriptions',
				name: 'Subscriptions',
				icon: Subscriptions
			},
			{
				path: '/packages',
				name: 'Packages',
				icon: Packages
			},
			{
				path: '/services',
				name: 'Services',
				icon: Services
			},
			{
				path: '/cycles',
				name: 'Cycles',
				icon: Cycles
			},
			{
				path: '/logout',
				name: 'Logout',
				icon: Logout
			}
		].map((v) => {
			return { ...v, active: isActive(v.path, active) };
		})
	);
</script>

<nav class="list-nav w-72 p-4">
	<ul>
		{#each items as item}
			<li>
				<a
					href={item.path}
					class={item.active}
					onclick={(evt) => {
						evt.preventDefault();
						drawerClose(item.path);
						goto(item.path);
					}}
					><span class="menu-icon">
						<item.icon />
					</span>{item.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	a {
		@apply inline-flex w-full gap-4 text-sm;
	}

	a.active {
		@apply bg-blue-900;
	}

	a:focus {
		@apply bg-none text-white;
	}

	.menu-icon {
		@apply text-white;
		height: 16px;
		width: 16px;
	}
</style>
