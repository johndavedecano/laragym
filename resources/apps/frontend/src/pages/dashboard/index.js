import Loadable from 'components/Loadable';

export default {
  exact: true,
  auth: false,
  path: '/',
  component: Loadable({
    loader: () => import('./dashboard'),
  }),
};
