import { showNotification } from 'actions/notification-actions';

const notificationMiddleware = (store) => (next) => (action) => {
  console.log(action);

  if (action.meta && action.meta.notification) {
    store.dispatch(showNotification(action.meta.notification));
  }

  return next(action);
};

export default notificationMiddleware;
