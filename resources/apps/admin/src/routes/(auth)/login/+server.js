// @ts-nocheck
import { json } from '@sveltejs/kit';

import { useApi } from '$lib/api.js';

const api = useApi();

export const POST = async ({ request, cookies }) => {
	try {
		const body = await request.json();

		const response = await api
			.post('/api/auth/login', body)
			.then((response) => response.data)
			.catch((error) => error.response.data);

		if (response.errors) return json({ success: true, ...response }, 401);

		cookies.set('token', response.access_token, { path: '/' });

		return json({ success: true, ...response });
	} catch (error) {
		return json({ message: error.message }, 500);
	}
};
