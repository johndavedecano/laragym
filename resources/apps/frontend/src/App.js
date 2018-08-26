import React, {Component} from 'react';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';

import {LayoutProvider} from 'contexts/layout-context';
import {AuthProvider} from 'contexts/auth-context';
import Root from 'components/Layouts/Root';
import initAxios from './utils/initAxios';
import pages from './pages';
import routes from './pages/routes';

const browserHistory = createBrowserHistory();

initAxios();

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <LayoutProvider>
          <Router history={browserHistory}>
            <Root>{routes(pages)}</Root>
          </Router>
        </LayoutProvider>
      </AuthProvider>
    );
  }
}

export default App;
