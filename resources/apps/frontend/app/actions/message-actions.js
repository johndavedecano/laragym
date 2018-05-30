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
        type: types.MESSAGE_LOAD,
      });

      const { data } = await api.get('/api/messages', { params });

      dispatch({
        type: types.MESSAGE_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        messages: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.MESSAGE_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load messages.',
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
        type: types.MESSAGE_CREATE,
      });

      await api.post('/api/messages', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.MESSAGE_CREATE_SUCCESS,
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
        type: types.MESSAGE_CREATE_FAILED,
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
        type: types.MESSAGE_UPDATE,
      });

      await api.put(`/api/messages/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.MESSAGE_UPDATE_SUCCESS,
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
        type: types.MESSAGE_UPDATE_FAILED,
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
        type: types.MESSAGE_DELETE,
      });

      await api.delete(`/api/messages/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.MESSAGE_DELETE_SUCCESS,
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
        type: types.MESSAGE_DELETE_FAILED,
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
