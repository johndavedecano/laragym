// @ts-nocheck
import { apiGet, apiPut, apiUpload } from './client.js';

/**
 * Get the authenticated member's profile
 * @returns {Promise<object>}
 */
export const getMe = () => apiGet('/api/me');

/**
 * Update the authenticated member's profile
 * @param {object} data
 */
export const updateMe = (data) => apiPut('/api/me', data);

/**
 * Update the authenticated member's password
 * @param {{ current_password: string, password: string, password_confirmation: string }} data
 */
export const updatePassword = (data) => apiPut('/api/me/password', data);

/**
 * Get the authenticated member's subscriptions
 * @param {Record<string, string>} [params]
 */
export const getSubscriptions = (params = {}) => apiGet('/api/me/subscriptions', params);

/**
 * Get the authenticated member's attendance records
 * @param {Record<string, string>} [params]  e.g. { month: '2025-01', page: '1' }
 */
export const getAttendance = (params = {}) => apiGet('/api/me/attendance', params);

/**
 * Upload avatar for a user
 * @param {number|string} userId
 * @param {File} file
 */
export const uploadAvatar = (userId, file) => {
	const formData = new FormData();
	formData.append('avatar', file);
	return apiUpload(`/api/users/${userId}/avatar`, formData);
};
