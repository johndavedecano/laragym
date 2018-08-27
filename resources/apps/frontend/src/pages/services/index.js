import React from 'react';
import Loadable from 'components/Loadable';
import {PrivateLayout} from 'components/Layouts';

import renderRoutes from './../routes';

export default {
  exact: false,
  auth: true,
  path: '/services',
  component: ({routes}) => {
    return <PrivateLayout>{renderRoutes(routes)}</PrivateLayout>;
  },
  routes: [
    {
      exact: true,
      auth: true,
      path: '/services',
      component: Loadable({
        loader: () => import('./lists'),
      }),
    },
    {
      exact: true,
      auth: true,
      path: '/services/create',
      component: Loadable({
        loader: () => import('./create'),
      }),
    },
    {
      exact: true,
      auth: true,
      path: '/services/:id',
      component: Loadable({
        loader: () => import('./show'),
      }),
    },
    {
      exact: true,
      auth: true,
      path: '/services/:id/edit',
      component: Loadable({
        loader: () => import('./edit'),
      }),
    },
  ],
};
