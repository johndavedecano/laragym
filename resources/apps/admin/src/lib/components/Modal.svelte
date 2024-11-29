<script>
	let { maxWidth, minHeight, children } = $props();
</script>

<div class="modal" style:maxWidth style:minHeight>
	{@render children()}
</div>

<style lang="postcss">
	.modal {
		@apply mx-4 flex w-full flex-col rounded bg-white shadow-lg lg:mx-0;
	}
</style>
