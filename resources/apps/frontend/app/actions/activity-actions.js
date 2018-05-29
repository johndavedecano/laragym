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
        type: types.ACTIVITY_LOAD,
      });

      const { data } = await api.get('/api/activities', { params });

      dispatch({
        type: types.ACTIVITY_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        activities: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.ACTIVITY_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load activities.',
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
        type: types.ACTIVITY_CREATE,
      });

      await api.post('/api/activities', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.ACTIVITY_CREATE_SUCCESS,
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
        type: types.ACTIVITY_CREATE_FAILED,
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
        type: types.ACTIVITY_UPDATE,
      });

      await api.put(`/api/activities/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.ACTIVITY_UPDATE_SUCCESS,
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
        type: types.ACTIVITY_UPDATE_FAILED,
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
        type: types.ACTIVITY_DELETE,
      });

      await api.delete(`/api/activities/${id}`);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.ACTIVITY_DELETE_SUCCESS,
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
        type: types.ACTIVITY_DELETE_FAILED,
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
