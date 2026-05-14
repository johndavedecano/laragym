// @ts-nocheck
import { apiPost } from './client.js';

/**
 * Login with email and password
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = (credentials) => apiPost('/api/auth/login', credentials);

/**
 * Register a new member account
 * @param {{ name: string, email: string, password: string, password_confirmation: string }} data
 */
export const register = (data) => apiPost('/api/auth/register', data);

/**
 * Send forgot password email
 * @param {{ email: string }} data
 */
export const forgotPassword = (data) => apiPost('/api/auth/forgot', data);

/**
 * Reset password using token
 * @param {{ token: string, email: string, password: string, password_confirmation: string }} data
 */
export const resetPassword = (data) => apiPost('/api/auth/reset', data);

/**
 * Logout (invalidate token server-side)
 */
export const logout = () => apiPost('/api/auth/logout', {});
