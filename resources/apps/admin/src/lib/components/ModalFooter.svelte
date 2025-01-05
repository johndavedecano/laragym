<script>
	let { children } = $props();
</script>

<div class="modal-footer">
	{@render children()}
</div>

<style lang="postcss">
	.modal-footer {
		@apply flex items-center border-t px-4 py-4;
	}
</style>
