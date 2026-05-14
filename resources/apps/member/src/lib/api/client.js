// @ts-nocheck

const TOKEN_KEY = 'laragym_token';

/**
 * Get the stored auth token from localStorage
 * @returns {string|null}
 */
export const getToken = () => {
	if (typeof localStorage === 'undefined') return null;
	return localStorage.getItem(TOKEN_KEY);
};

/**
 * Core fetch wrapper — reads token from localStorage, attaches Authorization header,
 * uses VITE_API_BASE_URL as base. Throws on non-2xx with API error message.
 *
 * @param {string} path  - e.g. "/api/me"
 * @param {RequestInit & { params?: Record<string, string> }} options
 * @returns {Promise<any>}
 */
export const apiFetch = async (path, options = {}) => {
	const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
	const token = getToken();

	const headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		...(options.headers ?? {})
	};

	// Build query string from params if provided
	let url = `${baseUrl}${path}`;
	if (options.params) {
		const qs = new URLSearchParams(
			Object.fromEntries(
				Object.entries(options.params).filter(([, v]) => v !== undefined && v !== null && v !== '')
			)
		).toString();
		if (qs) url += `?${qs}`;
	}

	const { params: _params, ...fetchOptions } = options;

	const response = await fetch(url, {
		...fetchOptions,
		headers
	});

	if (!response.ok) {
		let message = `Request failed with status ${response.status}`;
		try {
			const data = await response.json();
			if (data && data.message) message = data.message;
			else if (data && data.error) message = data.error;
		} catch {
			// ignore parse errors
		}
		const err = new Error(message);
		// @ts-ignore
		err.status = response.status;
		throw err;
	}

	// 204 No Content
	if (response.status === 204) return null;

	return response.json();
};

/**
 * Convenience methods
 */
export const apiGet = (path, params = {}) => apiFetch(path, { method: 'GET', params });

export const apiPost = (path, body = {}) =>
	apiFetch(path, { method: 'POST', body: JSON.stringify(body) });

export const apiPut = (path, body = {}) =>
	apiFetch(path, { method: 'PUT', body: JSON.stringify(body) });

export const apiDelete = (path) => apiFetch(path, { method: 'DELETE' });

/**
 * Multipart form upload (no Content-Type — let browser set boundary)
 */
export const apiUpload = (path, formData) => {
	const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
	const token = getToken();

	return fetch(`${baseUrl}${path}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		},
		body: formData
	}).then(async (response) => {
		if (!response.ok) {
			let message = `Request failed with status ${response.status}`;
			try {
				const data = await response.json();
				if (data && data.message) message = data.message;
			} catch {
				// ignore
			}
			const err = new Error(message);
			// @ts-ignore
			err.status = response.status;
			throw err;
		}
		if (response.status === 204) return null;
		return response.json();
	});
};
