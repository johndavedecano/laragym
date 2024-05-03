// @ts-nocheck
import { json } from '@sveltejs/kit';

import api from '$lib/api.js';

export const POST = async ({ request, cookies }) => {
	try {
		const body = await request.json();

		const response = await api
			.post('/api/auth/forgot', body)
			.then((response) => response.data)
			.catch((error) => error.response.data);

		if (response.errors) return json({ success: true, ...response }, 401);

		return json({ success: true, ...response });
	} catch (error) {
		return json({ message: error.message }, 500);
	}
};
