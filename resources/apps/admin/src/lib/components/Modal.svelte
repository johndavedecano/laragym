<script>
	export let maxWidth = 700;
	export let minHeight = 200;

	$: style = `
        max-width: ${maxWidth}px;
        min-height: ${minHeight}px;
    `;
</script>

<div class="modal" {style}>
	<slot />
</div>

<style>
	.modal {
		@apply mx-4 flex w-full flex-col rounded bg-white shadow-lg lg:mx-0;
	}
</style>
