/**
 * Combine all reducers in this file and export the combined reducers.
 */


import { combineReducers } from 'redux-immutable';
import languageProviderReducer from 'reducers/intl-reducer';

import auth from './auth';
import route from './route';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    route,
    language: languageProviderReducer,
    auth,
  });
}
