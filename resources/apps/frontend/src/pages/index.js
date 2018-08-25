import dashboard from './dashboard';
import NotFound from './errors/notfound';

const routes = [
  dashboard,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
