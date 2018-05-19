import { fromJS } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({});

const Logic = {};

Logic[types.ACTION_NAME] = (state, action) => state;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
