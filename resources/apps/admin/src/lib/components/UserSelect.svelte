<script>
	// @ts-nocheck
	import Select from 'svelte-select';
	import { browser } from '$app/environment';
	import { getBearerToken, useApi } from '$lib/api';

	let { value = $bindable([]), onChange, ...restProps } = $props();

	const api = useApi({
		Authorization: getBearerToken()
	});

	const loadOptions = async (value) => {
		try {
			if (!browser) return [];

			const params = {};

			let options = [];

			if (value) params['filter[name]'] = value;

			const response = await api.get('/users', { params });

			options = response.data.data;

			return options;
		} catch (error) {
			console.error(error);
			return [];
		}
	};
</script>

<Select
	{loadOptions}
	searchable
	itemId="id"
	label="name"
	onchange={(event) => onChange(event.detail)}
	bind:value
	{...restProps}
/>
