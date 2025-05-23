// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const PACKAGE_STORE = 'PACKAGE_STORE';

class PackageStore {
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

	loadPackage = async (id) => {
		const response = await this.api.get(`/packages/${id}`);
		return response.data;
	};

	createPackage = (params) => {
		return this.api.post('/packages', params);
	};

	deletePackage = async (id) => {
		this.items = this.items.filter((item) => item.id !== id);
		this.totalItems = this.totalItems - 1;

		await this.api.delete(`/packages/${id}`);
	};

	updatePackage = (id, params) => {
		return this.api.put(`/packages/${id}`, params);
	};

	loadPackages = async () => {
		try {
			this.loading = true;
			const response = await this.api.get('/branches', {
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

export const createPackageStoreContext = () => {
	return setContext(PACKAGE_STORE, new PackageStore());
};

export const getPackageStoreContext = () => {
	return getContext(PACKAGE_STORE);
};
