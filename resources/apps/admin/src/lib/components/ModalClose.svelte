<script>
	import { createEventDispatcher } from 'svelte';
	import Close from 'svelte-icons/md/MdClose.svelte';

	const dispatch = createEventDispatcher();

	const onClose = () => dispatch('close');
</script>

<a href="/" on:click|preventDefault={onClose} class="modal-close">
	<Close />
</a>

<style>
	.modal-close {
		width: 25px;
		height: 25px;
		@apply text-black;
	}
</style>
