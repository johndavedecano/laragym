import dashboard from './dashboard';
import auth from './auth';
import services from './services';
import packages from './packages';
import NotFound from './errors/notfound';

const routes = [
  auth,
  dashboard,
  services,
  packages,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
