// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	cookies.delete('token', { path: '/' });
	throw redirect(302, '/login');
}
