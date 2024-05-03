import { browser } from '$app/environment';
import { getToastStore } from '@skeletonlabs/skeleton';

export const useToast = () => {
	if (browser) {
		const store = getToastStore();
		return store;
	}
	return { trigger: () => {} };
};
