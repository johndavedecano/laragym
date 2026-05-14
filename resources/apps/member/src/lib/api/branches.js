// @ts-nocheck
import { apiGet } from './client.js';

/**
 * Get all branches
 * @param {Record<string, string>} [params]
 */
export const getBranches = (params = {}) => apiGet('/api/branches', params);
