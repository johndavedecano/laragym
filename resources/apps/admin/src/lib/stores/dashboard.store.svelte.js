// @ts-nocheck
import { getBearerToken, getErrorMessage, useApi } from '$lib/api';
import { ApiException } from '$lib/exceptions';
import { getContext, setContext } from 'svelte';

export const DASHBOARD_STORE = 'dashboard_store';

class DashboardStore {
	loading = $state(false);

	statistics = $state({
		subscriptions: 0,
		services: 0,
		packages: 0,
		members: 0
	});

	loaded = $state(false);

	constructor() {
		this.api = useApi({
			Authorization: getBearerToken()
		});
	}

	loadInitialData = async () => {
		try {
			this.loading = true;

			const [subscriptions, services, packages, members] = await Promise.all([
				this.api.get('/stats/subscriptions'),
				this.api.get('/stats/services'),
				this.api.get('/stats/packages'),
				this.api.get('/stats/members')
			]);

			this.statistics.subscriptions = subscriptions.data;
			this.statistics.services = services.data;
			this.statistics.packages = packages.data;
			this.statistics.members = members.data;
			this.loaded = true;
			this.loading = false;
		} catch (error) {
			this.loading = false;
			throw error;
		}
	};
}

export const createDashboardStoreContext = () => {
	return setContext(DASHBOARD_STORE, new DashboardStore());
};

export const getDashboardStoreContext = () => {
	return getContext(DASHBOARD_STORE);
};
