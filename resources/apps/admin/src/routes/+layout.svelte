<script>
	// @ts-nocheck

	import './../app.pcss';

	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Toast />
<Modal />

<slot></slot>
