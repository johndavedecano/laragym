import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isUpdating: false,
  profile: Map(),
});

const Logic = {};

Logic[types.PROFILE_LOAD] = (state) => state.set('isLoading', true);

Logic[types.PROFILE_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('profile', action.profile);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('profile', state.get('profile').merge(action.profile));
};

Logic[types.PROFILE_LOAD_FAILED] = (state) => state.set('isLoading', false).set('isLoaded', false);

Logic[types.PROFILE_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.PROFILE_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.PROFILE_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
