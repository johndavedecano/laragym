<script>
	// @ts-nocheck
	import { page } from '$app/stores';

	const tabs = [
		{
			path: '/',
			label: 'Home',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
				<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
			</svg>`
		},
		{
			path: '/subscription',
			label: 'Subscription',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
				<path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
				<path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
			</svg>`
		},
		{
			path: '/attendance',
			label: 'Attendance',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
				<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
			</svg>`
		},
		{
			path: '/profile',
			label: 'Profile',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
				<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
			</svg>`
		}
	];

	const isActive = (tabPath, currentPath) => {
		if (tabPath === '/' && currentPath === '/') return true;
		if (tabPath !== '/' && currentPath.startsWith(tabPath)) return true;
		return false;
	};
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-500/20 bg-surface-900 safe-bottom"
	style="padding-bottom: env(safe-area-inset-bottom);"
>
	<div class="flex h-16 items-stretch">
		{#each tabs as tab}
			{@const active = isActive(tab.path, $page.url.pathname)}
			<a
				href={tab.path}
				class="flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors duration-150
					{active
					? 'text-primary-400'
					: 'text-surface-300 hover:text-surface-100'}"
				aria-current={active ? 'page' : undefined}
			>
				<span class="h-6 w-6">
					{@html tab.icon}
				</span>
				<span class="leading-none">{tab.label}</span>
			</a>
		{/each}
	</div>
</nav>
