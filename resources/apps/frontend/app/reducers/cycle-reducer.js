import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  cycles: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.BILLING_CYCLE_LOAD] = (state) => state.set('isLoading', true);

Logic[types.BILLING_CYCLE_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('cycles', action.cycles);
  }
  return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('cycles', state.get('cycles').merge(action.cycles));
};

Logic[types.BILLING_CYCLE_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.BILLING_CYCLE_CREATE] = (state) => state.set('isCreating', true);

Logic[types.BILLING_CYCLE_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.BILLING_CYCLE_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.BILLING_CYCLE_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.BILLING_CYCLE_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.BILLING_CYCLE_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.BILLING_CYCLE_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.BILLING_CYCLE_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.BILLING_CYCLE_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
