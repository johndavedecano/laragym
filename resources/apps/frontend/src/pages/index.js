import dashboard from './dashboard';
import auth from './auth';
import NotFound from './errors/notfound';

const routes = [
  auth,
  dashboard,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
