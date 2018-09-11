import dashboard from './dashboard';
import auth from './auth';
import services from './services';
import packages from './packages';
import NotFound from './errors/notfound';
import billing_cycles from './billing-cycles';

const routes = [
  auth,
  dashboard,
  services,
  packages,
  billing_cycles,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
