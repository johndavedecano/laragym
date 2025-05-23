<script>
	import FaCreditCard from 'svelte-icons/fa/FaCreditCard.svelte';

	let { value = $bindable(), href, title, icon = FaCreditCard } = $props();
</script>

<div class="stat-card">
	<div class="stat-card-content">
		<div class="stat-card-desc">
			<div class="stat-card-value">{value}</div>
			<div class="stat-card-title">{title}</div>
		</div>
		<div class="stat-card-icon">
			{#if icon}
				{@const IconComponent = icon}
				<IconComponent></IconComponent>
			{/if}
		</div>
	</div>
	<div class="stat-card-footer">
		<a {href}>View All</a>
	</div>
</div>

<style lang="postcss">
	.stat-card {
		@apply flex w-full flex-col rounded-xl border shadow-xl;
	}

	.stat-card-content {
		@apply flex flex-1 items-center p-8;
	}

	.stat-card-desc {
		@apply flex-1;
	}

	.stat-card-icon {
		@apply h-12 w-12 text-black;
	}

	.stat-card-value {
		@apply text-4xl font-bold;
	}

	.stat-card-title {
		@apply text-lg;
	}

	.stat-card-footer {
		@apply border-t p-4 font-bold;
	}
</style>
