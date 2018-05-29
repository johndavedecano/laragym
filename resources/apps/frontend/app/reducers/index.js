/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';

import activity from './activity-reducer';
import alert from './alert-reducer';
import auth from './auth-reducer';
import cycle from './cycle-reducer';
import invoice from './invoice-reducer';
import languageProviderReducer from './intl-reducer';
import message from './message-reducer';
import notification from './notification-reducer';
import profile from './profile-reducer';
import route from './route-reducer';
import service from './service-reducer';
import setting from './setting-reducer';
import subscription from './subscription-reducer';
import user from './user-reducer';
import userPackages from './package-reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    activity,
    alert,
    auth,
    cycle,
    invoice,
    language: languageProviderReducer,
    message,
    notification,
    package: userPackages,
    profile,
    route,
    service,
    setting,
    subscription,
    user,
  });
}
