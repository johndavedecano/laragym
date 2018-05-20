import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoggedIn: false,
  isLoggingIn: false,
  user: {},
});

const Logic = {};

Logic[types.USER_LOGGED_IN] = (state) => state.set('isLogginIn', true);

Logic[types.USER_LOGGED_IN_FAILED] = (state) => state.set('isLogginIn', false);

Logic[types.USER_LOGGED_IN_SUCCESS] = (state, action) =>
  state
    .set('isLogginIn', false)
    .set('user', Map(action.user))
    .set('isLoggedIn', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
