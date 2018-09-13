import dashboard from './dashboard';
import auth from './auth';
import services from './services';
import packages from './packages';
import NotFound from './errors/notfound';
import billing_cycles from './billing-cycles';
import members from './members';
import subscriptions from './subscriptions';

const routes = [
  auth,
  dashboard,
  services,
  packages,
  members,
  billing_cycles,
  subscriptions,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
