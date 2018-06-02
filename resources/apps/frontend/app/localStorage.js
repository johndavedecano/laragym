import throttle from 'lodash/throttle';
import pick from 'lodash/pick';

const INITIAL_STATE = {};

/**
 * Loads app state from local storage.
 *
 * @returns {Map}
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return INITIAL_STATE;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // TODO: Add bugsnag logger
    return INITIAL_STATE;
  }
};

/**
 * Save app state to the local storage.
 *
 * @param {Map} state
 *
 * @returns {Boolean}
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    return true;
  } catch (error) {
    // TODO: Add bugsnag logger
    return false;
  }
};

const PERSISTED_STATES = ['auth', 'language', 'user', 'cycle', 'service'];

/**
 * Subscribe to store changes and save state
 * to the local storage every 1 second.
 *
 * @param {*} store
 *
 * @returns {void}
 */
export const createStoreSubscription = (store) => {
  try {
    store.subscribe(
      throttle(() => {
        saveState(pick(store.getState().toJS(), PERSISTED_STATES));
      }, 1000)
    );
  } catch (error) {
    // TODO: Add bugsnag logger
  }
};
