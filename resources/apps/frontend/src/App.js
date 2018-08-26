import React, {Component} from 'react';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';

import {AuthProvider} from 'contexts/auth-context';
import {LayoutProvider} from 'contexts/layout-context';
import initAxios from './utils/initAxios';
import initNoty from './utils/initNoty';
import pages from './pages';
import Root from 'components/Layouts/Root';
import routes from './pages/routes';

const browserHistory = createBrowserHistory();

initAxios();
initNoty();

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
