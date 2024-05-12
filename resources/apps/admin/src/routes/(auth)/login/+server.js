// @ts-nocheck
import { json } from '@sveltejs/kit';

import { useApi } from '$lib/api.js';

const api = useApi();

export const POST = async ({ request, cookies }) => {
	try {
		const body = await request.json();

		const response = await api
			.post('/auth/login', body)
			.then((response) => response.data)
			.catch((error) => error.response.data);

		if (response.errors) return json({ success: false, ...response }, 401);

		if (!response.user.is_admin) {
			return json(
				{ success: false, message: 'you are not allowed to access this page' },
				401
			);
		}

		cookies.set('token', response.access_token, { path: '/' });

		return json({ success: true, ...response });
	} catch (error) {
		return json({ message: error.message }, 500);
	}
};
