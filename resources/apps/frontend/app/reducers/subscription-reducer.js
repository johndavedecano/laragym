import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  subscriptions: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.SUBSCRIPTION_LOAD] = (state) => state.set('isLoading', true);

Logic[types.SUBSCRIPTION_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('subscriptions', action.subscriptions);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('params', action.params)
    .set(
      'subscriptions',
      state.get('subscriptions').merge(action.subscriptions)
    );
};

Logic[types.SUBSCRIPTION_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.SUBSCRIPTION_CREATE] = (state) => state.set('isCreating', true);

Logic[types.SUBSCRIPTION_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.SUBSCRIPTION_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.SUBSCRIPTION_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.SUBSCRIPTION_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.SUBSCRIPTION_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.SUBSCRIPTION_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.SUBSCRIPTION_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.SUBSCRIPTION_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
