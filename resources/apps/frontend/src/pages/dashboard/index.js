import Loadable from 'components/Loadable';

export default {
  exact: true,
  auth: true,
  path: '/',
  component: Loadable({
    loader: () => import('./dashboard'),
  }),
};
