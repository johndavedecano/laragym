<script>
	export let form = false;
</script>

{#if form}
	<form class="modal-body" {...$$props}>
		<slot />
	</form>
{:else}
	<div class="modal-body">
		<slot />
	</div>
{/if}

<style>
	.modal-body {
		@apply flex-1 p-4 lg:p-6;
	}
</style>
