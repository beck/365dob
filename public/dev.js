let componentsReady = false;
let appLoaded = false;

window.addEventListener('HTMLImportsLoaded', () => {
  componentsReady = true;
});

function checkComponentsReady() {
  // HTMLImportsLoaded usually fires before systemjs is finished.
  // Firing another event kicks off the app.
  if (appLoaded || !componentsReady) return;
  const evt = window.document.createEvent('CustomEvent');
  evt.initCustomEvent('HTMLImportsLoaded', true, true, {});
  window.document.dispatchEvent(evt);
  appLoaded = true;
}

window.System.import('main').then(checkComponentsReady);
