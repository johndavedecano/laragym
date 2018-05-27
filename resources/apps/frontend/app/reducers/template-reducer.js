import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  users: Map(),
  params: {},
});

const Logic = {};

Logic[types.USER_LOAD] = (state, action) => {};

Logic[types.USER_LOAD_SUCCESS] = (state, action) => {};

Logic[types.USER_LOAD_FAILED] = (state, action) => {};

Logic[types.USER_CREATE] = (state, action) => {};

Logic[types.USER_CREATE_SUCCESS] = (state, action) => {};

Logic[types.USER_CREATE_FAILED] = (state, action) => {};

Logic[types.USER_UPDATE] = (state, action) => {};

Logic[types.USER_UPDATE_SUCCESS] = (state, action) => {};

Logic[types.USER_UPDATE_FAILED] = (state, action) => {};

Logic[types.USER_DELETE] = (state, action) => {};

Logic[types.USER_DELETE_SUCCESS] = (state, action) => {};

Logic[types.USER_DELETE_FAILED] = (state, action) => {};

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
