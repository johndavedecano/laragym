<script>
	import AppLayout from '$lib/components/AppLayout.svelte';

	import './../../i18n';


	export let data = { token: '' };
</script>

<svelte:head>
	<meta charset="UTF-8" content={data.token} name="access_token" id="access_token" />
</svelte:head>

<AppLayout>
	<main>
		<slot></slot>
	</main>
</AppLayout>
