import { fromJS } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoggedIn: false,
  isLoggingIn: false,
  user: {},
});

const Logic = {};

Logic[types.USER_LOGGED_IN] = (state, action) => state;

Logic[types.USER_LOGGED_IN_FAILED] = (state, action) => state;

Logic[types.USER_LOGGED_IN_SUCCESS] = (state, action) => state;

Logic[types.USER_LOGGED_OUT] = (state, action) => state;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
