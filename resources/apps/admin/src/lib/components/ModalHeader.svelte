<script>
	let { children } = $props();
</script>

<div class="modal-header">
	{@render children()}
</div>

<style>
	.modal-header {
		@apply flex items-center border-b px-4 py-4;
	}
</style>
