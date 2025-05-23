// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const MEMBER_STORE = 'member_store';

class BranchStore {
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

	loadMember = async (id) => {
		const response = await this.api.get(`/users/${id}`);
		return response.data;
	};

	createMember = (params) => {
		return this.api.post('/users', params);
	};

	deleteMember = async (id) => {
		this.items = this.items.filter((item) => item.id !== id);
		this.totalItems = this.totalItems - 1;

		await this.api.delete(`/users/${id}`);
	};

	updateMember = (id, params) => {
		return this.api.put(`/users/${id}`, params);
	};

	loadMembers = async () => {
		try {
			this.loading = true;
			const response = await this.api.get('/users', {
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

export const createMemberStoreContext = () => {
	return setContext(MEMBER_STORE, new BranchStore());
};

export const getMemberStoreContext = () => {
	return getContext(MEMBER_STORE);
};
