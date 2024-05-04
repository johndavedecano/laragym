<script>
	// @ts-nocheck
	import Select from 'svelte-select';

	import { getBearerToken, useApi } from '$lib/api';
	import { browser } from '$app/environment';

	export let value;

	const api = useApi({
		Authorization: getBearerToken()
	});

	const loadOptions = async (value) => {
		try {
			if (!browser) return [];

			const params = {};

			let options = [];

			if (value) params['filter[name]'] = value;

			const response = await api.get('/cycles', { params });

			options = response.data.data;

			return options;
		} catch (error) {
			console.error(error);
			return [];
		}
	};
</script>

<Select {loadOptions} searchable itemId="id" label="name" bind:value {...$$props} />
