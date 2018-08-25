import Loadable from 'components/Loadable';

export default {
  exact: true,
  auth: false,
  path: '/login',
  component: Loadable({
    loader: () => import('./login'),
  }),
};
