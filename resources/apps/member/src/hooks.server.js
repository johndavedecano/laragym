// @ts-nocheck
// Auth is handled client-side via localStorage (JWT PWA pattern).
// No server-side redirect needed — layouts handle it in onMount.

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	return await resolve(event);
}
