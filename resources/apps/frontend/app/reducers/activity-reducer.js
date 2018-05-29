import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isClearing: false,
  activities: Map(),
});

const Logic = {};

Logic[types.ACTIVITY_LOAD] = (state) => state.set('isLoading', true);

Logic[types.ACTIVITY_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('activities', action.activities);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('activities', state.get('activities').merge(action.activities));
};

Logic[types.ACTIVITY_LOAD_FAILED] = (state) => state.set('isLoading', false).set('isLoaded', false);

Logic[types.ACTIVITY_CLEAR] = (state) => state.set('isClearing', true);

Logic[types.ACTIVITY_CLEAR_SUCCESS] = (state) => state.set('isClearing', true);

Logic[types.ACTIVITY_CLEAR_FAILED] = (state) => state.set('isClearing', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
