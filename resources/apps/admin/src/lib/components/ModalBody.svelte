<script>
	let { form, children, ...restProps } = $props();
</script>

{#if form}
	<form class="modal-body" {...restProps}>
		{@render children()}
	</form>
{:else}
	<div class="modal-body">
		{@render children()}
	</div>
{/if}

<style lang="postcss">
	.modal-body {
		@apply flex-1 p-4 lg:p-6;
	}
</style>
