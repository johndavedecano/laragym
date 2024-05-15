// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	let token = url.searchParams.get('token');
	let email = url.searchParams.get('email');
	return { token, email };
}
