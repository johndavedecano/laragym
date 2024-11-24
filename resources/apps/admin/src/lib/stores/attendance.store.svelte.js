// @ts-nocheck
import { getBearerToken, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const ATTENDANCE_STORE = 'attendance_store';

class AttendanceStore {
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
        this.loading = true

        const response = await this.api.get('/activities', {
            params: {
                page: this.currentPage,
                per_page: this.perPage,
                'filter[type]': 'attendance',
                'filter[entity]': 'user'
            }
        });

        this.items = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalItems = response.data.total;

        this.loading = false;

        this.loaded = true;
	};
}

export const createAttendanceStoreContext = () => {
	return setContext(ATTENDANCE_STORE, new AttendanceStore());
};

export const getAttendanceStoreContext = () => {
	return getContext(ATTENDANCE_STORE);
};
