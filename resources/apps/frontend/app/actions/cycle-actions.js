import get from 'lodash/get';
import { fromJS } from 'immutable';
import normalize from 'helpers/normalize';
import ApiError from 'helpers/ApiError';
import * as types from './../constants';

export const normalizeData = (data) =>
  fromJS(normalize(get(data, 'data', []), 'id'));

export function load(params, replace = true) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.BILLING_CYCLE_LOAD,
      });

      const { data } = await api.get('/api/cycles', { params });

      dispatch({
        type: types.BILLING_CYCLE_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        cycles: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.BILLING_CYCLE_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load cycles.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      throw new ApiError(error.response);
    }
  };
}

export function create(params = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.BILLING_CYCLE_CREATE,
      });

      await api.post('/api/cycles', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.BILLING_CYCLE_CREATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: ' Successfully created.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.BILLING_CYCLE_CREATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to create item.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      throw new ApiError(error.response);
    }
  };
}

export function update(id, params = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.BILLING_CYCLE_UPDATE,
      });

      await api.put(`/api/cycles/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.BILLING_CYCLE_UPDATE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Successfully Updated.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.BILLING_CYCLE_UPDATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to update item.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      throw new ApiError(error.response);
    }
  };
}

export function destroy(id) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.BILLING_CYCLE_DELETE,
      });

      await api.delete(`/api/cycles/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.BILLING_CYCLE_DELETE_SUCCESS,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Successfully deleted.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
    } catch (error) {
      dispatch({
        type: types.BILLING_CYCLE_DELETE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to delete item.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      throw new ApiError(error.response);
    }
  };
}
