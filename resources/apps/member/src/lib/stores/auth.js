// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const TOKEN_KEY = 'laragym_token';
const USER_KEY = 'laragym_user';

/**
 * Read persisted values from localStorage on init (browser only)
 */
const readPersistedState = () => {
	if (!browser) return { user: null, token: null, isAuthenticated: false };

	try {
		const token = localStorage.getItem(TOKEN_KEY);
		const userRaw = localStorage.getItem(USER_KEY);
		const user = userRaw ? JSON.parse(userRaw) : null;
		return {
			token,
			user,
			isAuthenticated: !!token
		};
	} catch {
		return { user: null, token: null, isAuthenticated: false };
	}
};

const createAuthStore = () => {
	const { subscribe, set, update } = writable(readPersistedState());

	return {
		subscribe,

		/**
		 * Persist token + user to localStorage and update the store
		 * @param {string} token
		 * @param {object} user
		 */
		login: (token, user) => {
			if (browser) {
				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(USER_KEY, JSON.stringify(user));
			}
			set({ token, user, isAuthenticated: true });
		},

		/**
		 * Clear token + user from localStorage and reset the store
		 */
		logout: () => {
			if (browser) {
				localStorage.removeItem(TOKEN_KEY);
				localStorage.removeItem(USER_KEY);
			}
			set({ token: null, user: null, isAuthenticated: false });
		},

		/**
		 * Update just the user object (e.g., after profile edit)
		 * @param {object} user
		 */
		setUser: (user) => {
			if (browser) {
				localStorage.setItem(USER_KEY, JSON.stringify(user));
			}
			update((s) => ({ ...s, user }));
		}
	};
};

export const authStore = createAuthStore();
