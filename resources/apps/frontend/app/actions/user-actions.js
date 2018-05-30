import get from 'lodash/get';
import { fromJS } from 'immutable';
import normalize from 'helpers/normalize';
import { handleActionError } from 'helpers/ActionErrorHandler';
import * as types from './../constants';

export const normalizeData = (data) =>
  fromJS(normalize(get(data, 'data', []), 'id'));

export function updateParams(params = {}) {
  return {
    type: types.USER_PARAMS_CHANGE,
    params,
  };
}

export function load(params, replace = true) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.USER_LOAD,
      });

      const { data } = await api.get('/api/users', { params });

      dispatch({
        type: types.USER_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        users: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.USER_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load users.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}

export function create(params = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.USER_CREATE,
      });

      await api.post('/api/users', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.USER_CREATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'User was successfully created.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.USER_CREATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to create user.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}

export function update(id, params = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.USER_UPDATE,
      });

      await api.put(`/api/users/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.USER_UPDATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'User was successfully updated.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.USER_UPDATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to update user.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}

export function destroy(id) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.USER_DELETE,
      });

      await api.delete(`/api/users/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.USER_DELETE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'User was successfully deleted.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.USER_DELETE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to delete user.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}
