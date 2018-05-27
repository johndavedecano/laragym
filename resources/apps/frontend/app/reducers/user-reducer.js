import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  users: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.USER_LOAD] = (state, action) => state.set('isLoading', true);

Logic[types.USER_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    // initial data or search result.
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('users', action.users);
  }
  // pagination append.
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('params', action.params)
    .set('users', state.get('users').merge(action.users));
};

Logic[types.USER_LOAD_FAILED] = (state, action) => state;

Logic[types.USER_CREATE] = (state, action) => state;

Logic[types.USER_CREATE_SUCCESS] = (state, action) => state;

Logic[types.USER_CREATE_FAILED] = (state, action) => state;

Logic[types.USER_UPDATE] = (state, action) => state;

Logic[types.USER_UPDATE_SUCCESS] = (state, action) => state;

Logic[types.USER_UPDATE_FAILED] = (state, action) => state;

Logic[types.USER_DELETE] = (state, action) => state;

Logic[types.USER_DELETE_SUCCESS] = (state, action) => state;

Logic[types.USER_DELETE_FAILED] = (state, action) => state;

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
