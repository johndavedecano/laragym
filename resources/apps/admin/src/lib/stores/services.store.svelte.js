// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const SERVICE_STORE = 'SERVICE_STORE';

class ServiceStore {
	items = $state([]);

	currentPage = $state(0);

	loading = $state(false);

	loaded = $state(false);

	totalItems = $state(0);

	perPage = $state(15);

	constructor() {
		this.api = useApi({
			Authorization: getBearerToken()
		});
	}

	loadService = async (id) => {
		const response = await this.api.get(`/services/${id}`);
		return response.data;
	};

	createService = (params) => {
		return this.api.post('/services', params);
	};

	deleteService = async (id) => {
		this.items = this.items.filter((item) => item.id !== id);
		this.totalItems = this.totalItems - 1;

		await this.api.delete(`/services/${id}`);
	};

	updateService = (id, params) => {
		return this.api.put(`/services/${id}`, params);
	};

	loadServices = async () => {
		try {
			this.loading = true;
			const response = await this.api.get('/services', {
				params: {
					page: this.currentPage + 1,
					per_page: this.perPage
				}
			});
			this.items = response.data.data;
			this.totalItems = response.data.total;
			this.loaded = false;
		} catch (error) {
			this.loading = false;
			throw error;
		}
	};
}

export const createServiceStoreContext = () => {
	return setContext(SERVICE_STORE, new ServiceStore());
};

export const getServiceStoreContext = () => {
	return getContext(SERVICE_STORE);
};
