import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  services: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.SERVICE_PARAMS_CHANGE] = (state, action) => state.mergeIn(['params'], action.params);

Logic[types.SERVICE_LOAD] = (state) => state.set('isLoading', true);

Logic[types.SERVICE_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .mergeIn(['params'], action.params)
      .set('services', action.services);
  }
  return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .mergeIn(['params'], action.params)
      .set('services', state.get('services').merge(action.services));
};

Logic[types.SERVICE_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.SERVICE_CREATE] = (state) => state.set('isCreating', true);

Logic[types.SERVICE_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.SERVICE_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.SERVICE_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.SERVICE_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.SERVICE_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.SERVICE_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.SERVICE_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.SERVICE_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
