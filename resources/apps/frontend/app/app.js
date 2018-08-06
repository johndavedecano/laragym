// Needed for es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import FontFaceObserver from 'fontfaceobserver';
import React from 'react';
import ReactDOM from 'react-dom';

// Some third party CSS goes here.
import 'sanitize.css/sanitize.css';
import 'react-select/dist/react-select.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
import '!file-loader?name=[name].[ext]!./images/icon-120x120.png';
import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/icon-167x167.png';
import '!file-loader?name=[name].[ext]!./images/icon-180x180.png';
import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!./images/user.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */
import initAxios from 'helpers/initAxios';
import configureStore from './configureStore';
import { loadState, createStoreSubscription } from './localStorage';
import { translationMessages } from './i18n';

/**
Observe loading of Roboto (to remove Roboto, remove the <link> tag in
the index.html file and this observer)
When Roboto is loaded, add a font-family using Roboto to the body
======================================================================
*/
const openSansObserver = new FontFaceObserver('Roboto', {});
openSansObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  }
);

// Create redux store with history
// Get state from local storage.
const initialState = loadState();
const history = createHistory();
const store = configureStore(initialState, history);

createStoreSubscription(store);

const MOUNT_NODE = document.getElementById('app');

if (localStorage.getItem('token')) {
  initAxios();
}

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

// Hot reloadable React components and translation json files
// modules.hot.accept does not accept dynamic dependencies,
// have to be constants at compile-time
if (module.hot) {
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ])
    )
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
