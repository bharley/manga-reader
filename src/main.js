import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { trigger } from 'redial';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
const store = createStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store); // eslint-disable-line global-require

  // Listen for route changes on the browser history instance:
  browserHistory.listen(location => {
    // Match routes based on location object:
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      // Get array of route handler components:
      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        store,
      };

      // Fetch deferred, client-only data dependencies:
      trigger('fetch', components, locals);
    });
  });

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
    />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default; // eslint-disable-line global-require

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}

// ========================================================
// Go!
// ========================================================
render();
