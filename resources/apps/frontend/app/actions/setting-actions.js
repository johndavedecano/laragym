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
        type: types.SETTING_LOAD,
      });

      const { data } = await api.get('/api/settings', { params });

      dispatch({
        type: types.SETTING_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        settings: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.SETTING_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load setting.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });

      throw new ApiError(error.response);
    }
  };
}

export function update(params = {}) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.SETTING_UPDATE,
      });

      await api.put('/api/settings', params);

      dispatch(load({ page: 1 }, true));

      dispatch({
        type: types.SETTING_UPDATE_SUCCESS,
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
        type: types.SETTING_UPDATE_FAILED,
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
