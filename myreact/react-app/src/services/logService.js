// import Raven from 'raven-js';

function init() {
  // Raven.config('https://api-key@sentry.io/acme', {
  //   release: '1-0-0',
  //   environment: 'development-test'
  // }).install();
}

function log(error) {
  console.log(error);
  // Raven.captureException(error);
}

export default {
  init,
  log
};