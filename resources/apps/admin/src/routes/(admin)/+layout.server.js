// @ts-nocheck

export async function load({ cookies }) {
	return {
		token: cookies.get('token')
	};
}
