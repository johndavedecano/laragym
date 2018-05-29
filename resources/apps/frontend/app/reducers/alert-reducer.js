import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  alerts: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.ALERT_LOAD] = (state) => state.set('isLoading', true);

Logic[types.ALERT_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('alerts', action.alerts);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('params', action.params)
    .set(
      'alerts',
      state.get('alerts').merge(action.alerts)
    );
};

Logic[types.ALERT_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.ALERT_CREATE] = (state) => state.set('isCreating', true);

Logic[types.ALERT_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.ALERT_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.ALERT_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.ALERT_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.ALERT_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.ALERT_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.ALERT_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.ALERT_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
