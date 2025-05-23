<script>
	// @ts-nocheck
	import Select from 'svelte-select';
	import { getBearerToken, useApi } from '$lib/api';
	import { browser } from '$app/environment';

	let { value = $bindable([]), ...restProps } = $props();

	const api = useApi({
		Authorization: getBearerToken()
	});

	const loadOptions = async (value) => {
		try {
			if (!browser) return [];

			const params = {};

			let options = [];

			if (value) params['filter[name]'] = value;

			const response = await api.get('/services', { params });

			options = response.data.data;

			return options;
		} catch (error) {
			return [];
		}
	};
</script>

<Select {loadOptions} searchable multiple itemId="id" label="name" bind:value {...restProps} />
