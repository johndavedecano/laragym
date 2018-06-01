import get from 'lodash/get';
import { fromJS } from 'immutable';
import normalize from 'helpers/normalize';
import { handleActionError } from 'helpers/ActionErrorHandler';
import * as types from './../constants';

export const normalizeData = (data) =>
  fromJS(normalize(get(data, 'data', []), 'id'));

export function updateParams(params = {}) {
  return {
    type: types.PACKAGE_PARAMS_CHANGE,
    params,
  };
}

export function load(params, replace = true) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.PACKAGE_LOAD,
      });

      const { data } = await api.get('/api/packages', { params });

      dispatch({
        type: types.PACKAGE_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        packages: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.PACKAGE_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load packages.',
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
        type: types.PACKAGE_CREATE,
      });

      await api.post('/api/packages', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.PACKAGE_CREATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'package was successfully created.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.PACKAGE_CREATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to create package.',
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
        type: types.PACKAGE_UPDATE,
      });

      await api.put(`/api/packages/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.PACKAGE_UPDATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'package was successfully updated.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.PACKAGE_UPDATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to update package.',
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
        type: types.PACKAGE_DELETE,
      });

      await api.delete(`/api/packages/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.PACKAGE_DELETE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'package was successfully deleted.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.PACKAGE_DELETE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to delete package.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}
