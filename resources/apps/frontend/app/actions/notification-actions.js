import uuid from 'uuid/v4';
import * as types from './../constants';

export function showNotification(settings) {
  return {
    type: types.NOTIFICATION_SHOW,
    notification: {
      id: uuid(),
      isOpen: true,
      ...settings,
    },
  };
}

export function closeNotification(id) {
  return {
    type: types.NOTIFICATION_SHOW,
    id,
  };
}

export function removeNotification(id) {
  return {
    type: types.NOTIFICATION_REMOVE,
    id,
  };
}
