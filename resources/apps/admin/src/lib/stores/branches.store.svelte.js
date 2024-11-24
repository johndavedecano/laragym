// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const BRANCH_STORE = 'branch_store';

class BranchStore {
	items = $state([]);

	currentPage = $state(1);

	loading = $state(false);

	loaded = $state(false);

	totalItems = $state(0);

	perPage = $state(15);

	constructor() {
		this.api = useApi({
			Authorization: getBearerToken()
		});
	}

	loadBranch = async (id) => {
		const response = await this.api.get(`/branches/${id}`);
		return response.data;
	};

	createBranch = (params) => {
		return this.api.post('/branches', params);
	};

	deleteBranch = async (id) => {
		this.items = this.items.filter((item) => item.id !== id);

		this.totalItems = this.totalItems - 1;

		await this.api.delete(`/branches/${id}`);
	};

	updateBranch = (id, params) => {
		return this.api.put(`/branches/${id}`, params);
	};

	loadBranches = async () => {
		try {
			this.loading = true;
			const response = await this.api.get('/branches', {
				params: {
					page: this.currentPage,
					per_page: this.perPage
				}
			});
			this.items = response.data.data;
			this.currentPage = response.data.current_page;
			this.totalItems = response.data.total;
			this.loaded = false;
		} catch (error) {
			this.loading = false;
			throw error;
		}
	};
}

export const createBranchStoreContext = () => {
	return setContext(BRANCH_STORE, new BranchStore());
};

export const getBranchStoreContext = () => {
	return getContext(BRANCH_STORE);
};
