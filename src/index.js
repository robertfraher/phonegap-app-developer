// import 'lie';
// import 'isomorphic-fetch';
import { options, h, render } from 'preact';
import { IntlProvider } from 'react-intl';

import './topcoat-mobile-light.min.css';
import './index.less';

if (!window.Intl) {
  require('intl'); // eslint-disable-line global-require
  require('intl/locale-data/jsonp/en'); // eslint-disable-line global-require
}

options.debounceRendering = f => f();
options.syncComponentUpdates = true;

let root;
function init() {
  window.navigator && window.navigator.splashscreen && window.navigator.splashscreen.hide();
  const App = require('./containers/App').default; // eslint-disable-line global-require

  root = render(
    <IntlProvider locale="en"><App /></IntlProvider>,
    document.getElementById('application'),
    root
  );
}

if (!window.cordova) {
  console.log('Cordova not found, starting anyways');
  init();
} else {
  console.log('Cordova found, starting now');
  document.addEventListener('deviceready', init, false);
}

if (module.hot) {
  module.hot.accept('./containers/App', () => requestAnimationFrame(() => {
    init();
  }));
}