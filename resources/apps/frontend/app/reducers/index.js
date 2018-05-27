/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import languageProviderReducer from 'reducers/intl-reducer';

import auth from './auth-reducer';
import notification from './notification-reducer';
import route from './route-reducer';
import user from './user-reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    auth,
    language: languageProviderReducer,
    notification,
    route,
    user,
  });
}
