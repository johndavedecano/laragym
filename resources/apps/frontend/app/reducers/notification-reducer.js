import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  items: {},
});

const Logic = {};

Logic[types.NOTIFICATION_SHOW] = (state, action) =>
  state.setIn(['items', action.notification.id], Map(action.notification));

Logic[types.NOTIFICATION_HIDE] = (state, action) =>
  state.setIn(['items', action.id, 'isOpen'], false);

Logic[types.NOTIFICATION_REMOVE] = (state, action) =>
  state.removeIn(['items', action.id]);

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
