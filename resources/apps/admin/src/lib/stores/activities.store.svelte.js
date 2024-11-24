// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const ACTIVITIES_STORE = 'activities_store';

class ActivitiesStore {
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

	loadItems = async () => {
		try {
			if (this.loading) return;

			this.loading = false;

			const response = await this.api.get('/activities', {
				params: {
					page: this.currentPage,
					per_page: this.perPage,
					'filter[type]': 'system'
				}
			});

			this.items = [...response.data.data];
			this.currentPage = response.data.current_page;
			this.totalItems = response.data.total;

			this.loading = false;
			this.loaded = true;

            console.log(this.loading)
		} catch (error) {
			this.loading = false;
			throw new ApiException(error.message);
		}
	};
}

export const createActivitiesStoreContext = () => {
	return setContext(ACTIVITIES_STORE, new ActivitiesStore());
};

export const getActivitiesStoreContext = () => {
	return getContext(ACTIVITIES_STORE);
};
