import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  messages: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.MESSAGE_LOAD] = (state) => state.set('isLoading', true);

Logic[types.MESSAGE_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('messages', action.messages);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('params', action.params)
    .set('messages', state.get('messages').merge(action.messages));
};

Logic[types.MESSAGE_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.MESSAGE_CREATE] = (state) => state.set('isCreating', true);

Logic[types.MESSAGE_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.MESSAGE_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.MESSAGE_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.MESSAGE_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.MESSAGE_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.MESSAGE_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.MESSAGE_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.MESSAGE_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
