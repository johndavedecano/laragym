// @ts-nocheck
import { redirect } from '@sveltejs/kit';

const PUBLIC_PAGES = ['/login', '/reset', '/forgot', '/activate', '/register', '/resend'];

const isPublicPage = (pathname) => {
	for (let i = 0; i < PUBLIC_PAGES.length; i++) {
		if (pathname.startsWith(PUBLIC_PAGES[i])) return true;
	}
	return false;
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const pathname = event.url.pathname;

	if (isPublicPage(pathname)) return await resolve(event);

	const token = event.cookies.get('token');

	if (!token) throw redirect(302, '/login');

	return await resolve(event);
}
