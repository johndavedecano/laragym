import React from 'react';
import Loadable from 'components/Loadable';
import {PublicLayout} from 'components/Layouts';

import renderRoutes from './../routes';

export default {
  exact: false,
  auth: false,
  path: '/auth',
  component: ({routes}) => {
    return <PublicLayout>{renderRoutes(routes)}</PublicLayout>;
  },
  routes: [
    {
      exact: true,
      auth: false,
      path: '/auth/login',
      component: Loadable({
        loader: () => import('./login'),
      }),
    },
    {
      exact: true,
      auth: false,
      path: '/auth/forgot',
      component: Loadable({
        loader: () => import('./forgot'),
      }),
    },
    {
      exact: true,
      auth: false,
      path: '/auth/reset/:token',
      component: Loadable({
        loader: () => import('./reset'),
      }),
    },
  ],
};
