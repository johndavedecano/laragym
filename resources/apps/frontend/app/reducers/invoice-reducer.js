import { fromJS, Map } from 'immutable';

import * as types from './../constants';

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  invoices: Map(),
  params: Map(),
});

const Logic = {};

Logic[types.INVOICE_LOAD] = (state) => state.set('isLoading', true);

Logic[types.INVOICE_LOAD_SUCCESS] = (state, action) => {
  if (action.replace) {
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('params', action.params)
      .set('invoices', action.invoices);
  }
  return state
    .set('isLoading', false)
    .set('isLoaded', true)
    .set('params', action.params)
    .set(
      'invoices',
      state.get('invoices').merge(action.invoices)
    );
};

Logic[types.INVOICE_LOAD_FAILED] = (state) =>
  state.set('isLoading', false).set('isLoaded', false);

Logic[types.INVOICE_CREATE] = (state) => state.set('isCreating', true);

Logic[types.INVOICE_CREATE_SUCCESS] = (state) => state.set('isCreating', false);

Logic[types.INVOICE_CREATE_FAILED] = (state) => state.set('isCreating', false);

Logic[types.INVOICE_UPDATE] = (state) => state.set('isUpdating', true);

Logic[types.INVOICE_UPDATE_SUCCESS] = (state) => state.set('isUpdating', true);

Logic[types.INVOICE_UPDATE_FAILED] = (state) => state.set('isUpdating', true);

Logic[types.INVOICE_DELETE] = (state) => state.set('isDeleting', true);

Logic[types.INVOICE_DELETE_SUCCESS] = (state) => state.set('isDeleting', true);

Logic[types.INVOICE_DELETE_FAILED] = (state) => state.set('isDeleting', true);

Logic[types.USER_LOGGED_OUT] = () => initialState;

export default function (state = initialState, action) {
  return Logic[action.type] ? Logic[action.type](state, action) : state;
}
