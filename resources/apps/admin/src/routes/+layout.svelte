<script>
	// @ts-nocheck

	import './../app.pcss';

	import './../i18n';

	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';

	initializeStores();
	
</script>

<Toast />
<Modal />

<slot></slot>
