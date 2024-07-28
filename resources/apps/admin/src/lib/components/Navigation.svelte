<script>
	// @ts-nocheck
	import { _ } from 'svelte-i18n';
	import Dashboard from 'svelte-icons/fa/FaHome.svelte';
	import Activities from 'svelte-icons/fa/FaUserClock.svelte';
	import Attendance from 'svelte-icons/fa/FaCalendar.svelte';
	import Members from 'svelte-icons/fa/FaUsers.svelte';
	import Subscriptions from 'svelte-icons/fa/FaCreditCard.svelte';
	import Packages from 'svelte-icons/fa/FaBox.svelte';
	import Services from 'svelte-icons/fa/FaServer.svelte';
	import Cycles from 'svelte-icons/fa/FaCalendarPlus.svelte';
	// import Settings from 'svelte-icons/fa/FaCog.svelte';
	// import Account from 'svelte-icons/fa/FaUserCog.svelte';
	import Logout from 'svelte-icons/fa/FaSignOutAlt.svelte';
	import Branches from 'svelte-icons/fa/FaBuilding.svelte';

	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	let active = $page.url.pathname;

	const drawerClose = (path) => {
		active = path;
		drawerStore.close();
	};

	const isActive = (value, current) => {
		if (current === '/' && value === current) return 'active';
		if (current && current.startsWith(value) && value !== '/') return 'active';
	};

	$: items = [
		{
			path: '/',
			name: $_('ndash'),
			icon: Dashboard
		},
		{
			path: '/activities',
			name: $_('nact'),
			icon: Activities
		},
		{
			path: '/attendance',
			name: $_('natt'),
			icon: Attendance
		},
		{
			path: '/members',
			name: $_('nmem'),
			icon: Members
		},
		{
			path: '/branches',
			name: $_('nbran'),
			icon: Branches
		},
		{
			path: '/subscriptions',
			name: $_('nsubs'),
			icon: Subscriptions
		},
		{
			path: '/packages',
			name: $_('npack'),
			icon: Packages
		},
		{
			path: '/services',
			name: $_('nservs'),
			icon: Services
		},
		{
			path: '/cycles',
			name: $_('ncycles'),
			icon: Cycles
		},
		// {
		// 	path: '/account',
		// 	name: 'Account',
		// 	icon: Account
		// },
		// {
		// 	path: '/settings',
		// 	name: 'Settings',
		// 	icon: Settings
		// },
		{
			path: '/logout',
			name: $_('nlogout'),
			icon: Logout
		}
	].map((v) => {
		return { ...v, active: isActive(v.path, active) };
	});
</script>

<nav class="list-nav w-72 p-4">
	<ul>
		{#each items as item}
			<li>
				<a href={item.path} class={item.active} on:click={() => drawerClose(item.path)}
					><span class="menu-icon">
						<svelte:component this={item.icon} />
					</span>{item.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
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
