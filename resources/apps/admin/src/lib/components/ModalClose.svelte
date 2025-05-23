<script>
	// @ts-nocheck
	import Close from 'svelte-icons/md/MdClose.svelte';

	let props = $props();

	const onClose = (event) => {
		event.preventDefault();
		props.onClose();
	};
</script>

<a href="/" onclick={onClose} class="modal-close">
	<Close />
</a>

<style lang="postcss">
	.modal-close {
		width: 25px;
		height: 25px;
		@apply text-black;
	}
</style>
