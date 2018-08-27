import dashboard from './dashboard';
import auth from './auth';
import services from './services';
import NotFound from './errors/notfound';

const routes = [
  auth,
  dashboard,
  services,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
