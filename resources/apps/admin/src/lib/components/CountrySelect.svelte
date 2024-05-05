<script>
	// @ts-nocheck

	import { COUNTRY_LIST } from '$lib/countries';

	import Select from 'svelte-select';

	export let value;
</script>

<Select items={COUNTRY_LIST} searchable itemId="code" label="name" bind:value {...$$props} />
