import get from 'lodash/get';
import { fromJS } from 'immutable';
import normalize from 'helpers/normalize';

import * as types from './../constants';

export const normalizeData = (data) =>
  fromJS(normalize(get(data, 'data', []), 'id'));

export function load(params, replace = false) {
  return async (dispatch, getState, api) => {
    try {
      dispatch({
        type: types.USER_LOAD,
      });

      const { data } = await api.get('/api/users', params);

      dispatch({
        type: types.USER_LOAD_SUCCESS,
        params: fromJS(get(data, 'meta')),
        users: normalizeData(data),
        replace,
      });
    } catch (error) {
      dispatch({
        type: types.USER_LOAD_FAILED,
        meta: {
          notification: {
            type: 'snackbar',
            message: 'Unable to load users.',
            vertical: 'bottom',
            horizontal: 'right',
          },
        },
      });
      throw error;
    }
  };
}

export function create(params = {}) {
  return async (dispatch, getState, api) => {
    try {
    } catch (error) {}
  };
}

export function update(id, params = {}) {
  return async (dispatch, getState, api) => {
    try {
    } catch (error) {}
  };
}

export function destroy(id) {
  return async (dispatch, getState, api) => {
    try {
    } catch (error) {}
  };
}
