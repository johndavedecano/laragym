<script>
	// @ts-nocheck
	import { COUNTRY_LIST } from '$lib/countries';
	import Select from 'svelte-select';

	let { value = $bindable(), ...restProps } = $props();
</script>

<Select items={COUNTRY_LIST} searchable itemId="code" label="name" bind:value {...restProps} />
