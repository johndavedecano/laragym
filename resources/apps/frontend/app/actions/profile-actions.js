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
        type: types.PROFILE_LOAD,
      });

      const { data } = await api.get('/api/profile', { params });

      dispatch({
        type: types.PROFILE_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        profile: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.PROFILE_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load profile.',
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
        type: types.PROFILE_UPDATE,
      });

      await api.put(`/api/users/${id}`, params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.PROFILE_UPDATE_SUCCESS,
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
        type: types.PROFILE_UPDATE_FAILED,
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
