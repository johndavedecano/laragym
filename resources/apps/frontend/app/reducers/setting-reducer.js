import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isUpdating: false,
  settings: Map(),
});

const Logic = {};

Logic[types.SETTING_LOAD] = (state) => state.set('isLoading', true);

Logic[types.SETTING_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('settings', action.settings);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('settings', state.get('settings').merge(action.settings));
};

Logic[types.SETTING_LOAD_FAILED] = (state) => state.set('isLoading', false).set('isLoaded', false);

Logic[types.SETTING_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.SETTING_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.SETTING_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
