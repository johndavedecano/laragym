<script>
	export let customClass = '';
</script>

<div class={`wrapper ${customClass}`}>
	<slot />
</div>

<style>
	.wrapper {
		@apply fixed bottom-0 left-0 right-0 top-0 flex h-full min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden;
	}
</style>
