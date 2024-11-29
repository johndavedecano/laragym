<script>
	let { customClass, children } = $props();
</script>

<div class={`wrapper ${customClass}`}>
	{@render children()}
</div>

<style lang="postcss">
	.wrapper {
		@apply fixed bottom-0 left-0 right-0 top-0 flex h-full min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden;
	}
</style>
