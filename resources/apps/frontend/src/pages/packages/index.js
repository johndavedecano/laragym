import React from 'react';
import Loadable from 'components/Loadable';
import {PrivateLayout} from 'components/Layouts';

import renderRoutes from './../routes';

export default {
  exact: false,
  auth: true,
  path: '/packages',
  component: ({routes}) => {
    return <PrivateLayout>{renderRoutes(routes)}</PrivateLayout>;
  },
  routes: [
    {
      exact: true,
      auth: true,
      path: '/packages',
      component: Loadable({
        loader: () => import('./lists'),
      }),
    },
    {
      exact: true,
      auth: true,
      path: '/packages/create',
      component: Loadable({
        loader: () => import('./create'),
      }),
    },
    {
      exact: true,
      auth: true,
      path: '/packages/:id',
      component: Loadable({
        loader: () => import('./show'),
      }),
    },
    {
      exact: true,
      auth: true,
      path: '/packages/:id/edit',
      component: Loadable({
        loader: () => import('./edit'),
      }),
    },
  ],
};
