import 'whatwg-fetch'; // eslint-disable-line

import app from './app';

window.addEventListener('HTMLImportsLoaded', () => {
  app.loadCalendar();
});
