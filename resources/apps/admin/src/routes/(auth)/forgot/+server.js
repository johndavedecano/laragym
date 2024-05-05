// @ts-nocheck
import { json } from '@sveltejs/kit';

import { useApi } from '$lib/api.js';

const api = useApi();

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		const response = await api
			.post('/auth/forgot', body)
			.then((response) => response.data)
			.catch((error) => error.response.data);

		if (response.errors) return json({ success: true, ...response }, 401);

		return json({ success: true, ...response });
	} catch (error) {
		return json({ message: error.message }, 500);
	}
};
