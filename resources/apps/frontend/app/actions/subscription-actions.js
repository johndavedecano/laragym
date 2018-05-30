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
        type: types.SUBSCRIPTION_LOAD,
      });

      const { data } = await api.get('/api/subscriptions', { params });

      dispatch({
        type: types.SUBSCRIPTION_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        subscriptions: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.SUBSCRIPTION_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load subscriptions.',
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
        type: types.SUBSCRIPTION_CREATE,
      });

      await api.post('/api/subscriptions', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SUBSCRIPTION_CREATE_SUCCESS,
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
        type: types.SUBSCRIPTION_CREATE_FAILED,
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
        type: types.SUBSCRIPTION_UPDATE,
      });

      await api.put(`/api/subscriptions/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SUBSCRIPTION_UPDATE_SUCCESS,
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
        type: types.SUBSCRIPTION_UPDATE_FAILED,
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
        type: types.SUBSCRIPTION_DELETE,
      });

      await api.delete(`/api/subscriptions/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SUBSCRIPTION_DELETE_SUCCESS,
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
        type: types.SUBSCRIPTION_DELETE_FAILED,
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
