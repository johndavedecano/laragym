import get from 'lodash/get';
import { fromJS } from 'immutable';
import normalize from 'helpers/normalize';
import { handleActionError } from 'helpers/ActionErrorHandler';
import * as types from './../constants';

export const normalizeData = (data) =>
  fromJS(normalize(get(data, 'data', []), 'id'));

export function load(params, replace = true) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.SERVICE_LOAD,
      });

      const { data } = await api.get('/api/services', { params });

      dispatch({
        type: types.SERVICE_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        services: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.SERVICE_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load services.',
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
        type: types.SERVICE_CREATE,
      });

      await api.post('/api/services', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SERVICE_CREATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Service was successfully created.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.SERVICE_CREATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to create service.',
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
        type: types.SERVICE_UPDATE,
      });

      await api.put(`/api/services/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SERVICE_UPDATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Service was successfully updated.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.SERVICE_UPDATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to update service.',
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
        type: types.SERVICE_DELETE,
      });

      await api.delete(`/api/services/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SERVICE_DELETE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Service was successfully deleted.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.SERVICE_DELETE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to delete service.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}
