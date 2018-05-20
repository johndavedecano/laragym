import axios from 'axios';
import get from 'lodash/get';
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
export function login(data = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({ type: types.USER_LOGGED_IN });
      const response = await api.post('/api/auth/login', data);

      const token = get(response, 'data.token');

      localStorage.setItem('token', token);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const userResponse = await api.get('/api/auth/me');

      const user = get(userResponse, 'data', {});

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
            message: get(error, 'response.data.error.message'),
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
      throw new Error(get(error, 'response.data.error.message'));
    }
  };
}
