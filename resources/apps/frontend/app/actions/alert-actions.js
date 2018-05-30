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
        type: types.ALERT_LOAD,
      });

      const { data } = await api.get('/api/alerts', { params });

      dispatch({
        type: types.ALERT_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        alerts: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.ALERT_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load alerts.',
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
        type: types.ALERT_CREATE,
      });

      await api.post('/api/alerts', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.ALERT_CREATE_SUCCESS,
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
        type: types.ALERT_CREATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to create item.',
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
        type: types.ALERT_UPDATE,
      });

      await api.put(`/api/alerts/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.ALERT_UPDATE_SUCCESS,
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
        type: types.ALERT_UPDATE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to update item.',
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
        type: types.ALERT_DELETE,
      });

      await api.delete(`/api/alerts/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.ALERT_DELETE_SUCCESS,
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
        type: types.ALERT_DELETE_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to delete item.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      handleActionError(error);
    }
  };
}
