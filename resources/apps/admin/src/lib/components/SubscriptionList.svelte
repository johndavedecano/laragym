<script>
	let { children } = $props();
</script>

<div class="subscriptions">
	{@render children()}
</div>

<style lang="postcss">
	.subscriptions {
		@apply grid grid-cols-4 gap-4;
	}
</style>
