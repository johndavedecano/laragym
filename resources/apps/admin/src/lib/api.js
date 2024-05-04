import { browser } from '$app/environment';
import { PUBLIC_API_URL } from '$env/static/public';

import axios from 'axios';

export const getErrorMessage = (
	/** @type {{ message: any; response: { data: { message: any; }; }; }} */ error
) => {
	let message = error.message;

	if (error && error.response && error.response.data && error.response.data.message) {
		message = error.response.data.message;
	}

	return message;
};

export const getBearerToken = () => {
	if (browser) {
		const token = document.getElementById('access_token');
		const value = token ? token.getAttribute('content') : undefined;
		return value ? `Bearer ${value}` : undefined;
	}
	return undefined;
};

export const useApi = (headers = {}) => {
	return axios.create({ headers, baseURL: PUBLIC_API_URL + '/api' });
};
