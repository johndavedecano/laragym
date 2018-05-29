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
        type: types.INVOICE_LOAD,
      });

      const { data } = await api.get('/api/invoices', { params });

      dispatch({
        type: types.INVOICE_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        invoices: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.INVOICE_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load invoices.',
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
        type: types.INVOICE_CREATE,
      });

      await api.post('/api/invoices', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.INVOICE_CREATE_SUCCESS,
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
        type: types.INVOICE_CREATE_FAILED,
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
        type: types.INVOICE_UPDATE,
      });

      await api.put(`/api/invoices/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.INVOICE_UPDATE_SUCCESS,
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
        type: types.INVOICE_UPDATE_FAILED,
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
        type: types.INVOICE_DELETE,
      });

      await api.delete(`/api/invoices/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.INVOICE_DELETE_SUCCESS,
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
        type: types.INVOICE_DELETE_FAILED,
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
