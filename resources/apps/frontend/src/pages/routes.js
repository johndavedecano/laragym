import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {AuthConsumer} from 'contexts/auth-context';

const RedirectComponent = ({to = '/404'}) => <Redirect to={to} />;

const RouteWithSubRoutes = route => {
  return (
    <Route
      path={route.path}
      render={props => {
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
};

const AuthRoute = route => {
  return (
    <AuthConsumer>
      {({isAuth}) => (
        <Route
          path={route.path}
          render={props =>
            isAuth === true ? (
              <route.component {...props} routes={route.routes} />
            ) : (
              <RedirectComponent to="/auth/login" />
            )
          }
        />
      )}
    </AuthConsumer>
  );
};

const PreventAuthRoute = route => {
  return (
    <AuthConsumer>
      {({isAuth}) => (
        <Route
          path={route.path}
          render={props =>
            isAuth === false ? (
              <route.component {...props} routes={route.routes} />
            ) : (
              <RedirectComponent to="/" />
            )
          }
        />
      )}
    </AuthConsumer>
  );
};

const renderRoutes = routes => {
  return (
    <Switch>
      {routes.map(({auth, ...rest}, i) => {
        switch (auth) {
          case true: {
            return <AuthRoute key={i} {...rest} />;
          }

          case false: {
            return <PreventAuthRoute key={i} {...rest} />;
          }

          default: {
            return <RouteWithSubRoutes key={i} {...rest} />;
          }
        }
      })}

      <Route component={RedirectComponent} />
    </Switch>
  );
};

export default renderRoutes;
