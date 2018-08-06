import get from 'lodash/get';

import { handleActionError } from 'helpers/ActionErrorHandler';

import initAxios from 'helpers/initAxios';

import * as types from './../constants';

export function logout() {
  return (dispatch) => {
    dispatch({
      type: types.USER_LOGGED_OUT,
    });
  };
}

/**
 * Log in a user. Request for a JWT token.
 *
 * @param {Object} data
 *
 * @returns {Function}
 */
export function check() {
  return async (dispatch, getState, api) => {
    try {
      const userResponse = await api.get('/api/me');

      const user = get(userResponse, 'data', {});

      if (!user.is_admin) {
        throw new Error('You are not allowed to access this page.');
      }

      dispatch({
        type: types.USER_LOGGED_IN_SUCCESS,
        user,
      });
    } catch (error) {
      dispatch({
        type: types.USER_LOGGED_IN_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: error.message,
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
      handleActionError(error);
    }
  };
}

/**
 * Log in a user. Request for a JWT token.
 *
 * @param {Object} data
 *
 * @returns {Function}
 */
export function login(data = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({ type: types.USER_LOGGED_IN });
      const response = await api.post('/api/auth/login', data);

      const token = get(response, 'data.token');

      localStorage.setItem('token', token);

      initAxios();

      const userResponse = await api.get('/api/me');

      const user = get(userResponse, 'data', {});

      if (!user.is_admin) {
        throw new Error('You are not allowed to access this page.');
      }

      dispatch({
        type: types.USER_LOGGED_IN_SUCCESS,
        user,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Successfully Logged in',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.USER_LOGGED_IN_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: get(error, 'response.data.error.message', error.message),
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
      handleActionError(error);
    }
  };
}
