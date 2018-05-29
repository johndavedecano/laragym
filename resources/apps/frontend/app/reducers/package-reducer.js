import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  packages: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.PACKAGE_LOAD] = (state) => state.set('isLoading', true);

Logic[types.PACKAGE_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('packages', action.packages);
  }
  return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('packages', state.get('packages').merge(action.packages));
};

Logic[types.PACKAGE_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.PACKAGE_CREATE] = (state) => state.set('isCreating', true);

Logic[types.PACKAGE_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.PACKAGE_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.PACKAGE_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.PACKAGE_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.PACKAGE_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.PACKAGE_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.PACKAGE_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.PACKAGE_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
