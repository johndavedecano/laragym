<script>
	import Dashboard from 'svelte-icons/fa/FaHome.svelte';
	import Activities from 'svelte-icons/fa/FaUserClock.svelte';
	import Attendance from 'svelte-icons/fa/FaCalendar.svelte';
	import Members from 'svelte-icons/fa/FaUsers.svelte';
	import Subscriptions from 'svelte-icons/fa/FaCreditCard.svelte';
	import Packages from 'svelte-icons/fa/FaBox.svelte';
	import Services from 'svelte-icons/fa/FaServer.svelte';
	import Cycles from 'svelte-icons/fa/FaCalendarPlus.svelte';
	import Settings from 'svelte-icons/fa/FaCog.svelte';
	import Account from 'svelte-icons/fa/FaUserCog.svelte';
	import Logout from 'svelte-icons/fa/FaSignOutAlt.svelte';

	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const drawerClose = () => drawerStore.close();
</script>

<nav class="list-nav w-72 p-4">
	<ul>
		<li>
			<a href="/" on:click={drawerClose}
				><span class="menu-icon"><Dashboard /></span>Dashboard</a
			>
		</li>
		<li>
			<a href="/activities" on:click={drawerClose}
				><span class="menu-icon"><Activities /></span>Activities</a
			>
		</li>
		<li>
			<a href="/attendance" on:click={drawerClose}
				><span class="menu-icon"><Attendance /></span>Attendance</a
			>
		</li>
		<li>
			<a href="/members" on:click={drawerClose}
				><span class="menu-icon"><Members /></span>Members</a
			>
		</li>
		<li>
			<a href="/subscriptions" on:click={drawerClose}
				><span class="menu-icon"><Subscriptions /></span>Subscriptions</a
			>
		</li>
		<li>
			<a href="/packages" on:click={drawerClose}
				><span class="menu-icon"><Packages /></span>Packages</a
			>
		</li>
		<li>
			<a href="/services" on:click={drawerClose}
				><span class="menu-icon"><Services /></span>Services</a
			>
		</li>
		<li>
			<a href="/cycles" on:click={drawerClose}
				><span class="menu-icon"><Cycles /></span>Cycles</a
			>
		</li>
		<li>
			<a href="/account" on:click={drawerClose}
				><span class="menu-icon"><Account /></span>Account</a
			>
		</li>
		<li>
			<a href="/settings" on:click={drawerClose}
				><span class="menu-icon"><Settings /></span>Settings</a
			>
		</li>
		<li>
			<a href="/logout" on:click={drawerClose}
				><span class="menu-icon"><Logout /></span>Logout</a
			>
		</li>
	</ul>
</nav>

<style>
	a {
		@apply inline-flex w-full gap-4 text-sm;
	}
	.menu-icon {
		@apply text-white;
		height: 16px;
		width: 16px;
	}
</style>
