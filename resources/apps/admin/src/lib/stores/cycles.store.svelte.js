// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const CYCLE_STORE = 'CYCLE_STORE';

class CycleStore {
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

	loadCycle = async (id) => {
		const response = await this.api.get(`/cycles/${id}`);
		return response.data;
	};

	createCycle = (params) => {
		return this.api.post('/cycles', params);
	};

	deleteCycle = async (id) => {
		this.items = this.items.filter((item) => item.id !== id);
		this.totalItems = this.totalItems - 1;

		await this.api.delete(`/cycles/${id}`);
	};

	updateCycle = (id, params) => {
		return this.api.put(`/cycles/${id}`, params);
	};

	loadCycles = async () => {
		try {
			this.loading = true;
			const response = await this.api.get('/cycles', {
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

export const createCycleStoreContext = () => {
	return setContext(CYCLE_STORE, new CycleStore());
};

export const getCycleStoreContext = () => {
	return getContext(CYCLE_STORE);
};
