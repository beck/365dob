var componentsReady = false;
var appLoaded = false;

window.addEventListener('HTMLImportsLoaded', function() {
  'use strict';
  componentsReady = true;
});

function checkComponentsReady(){
  'use strict';
  // HTMLImportsLoaded usually fires before systemjs is finished.
  // Firing another event kicks off the app.
  if(appLoaded || !componentsReady){ return; }
  var evt = window.document.createEvent('CustomEvent');
  evt.initCustomEvent('HTMLImportsLoaded', true, true, {});
  window.document.dispatchEvent(evt);
  appLoaded = true;
}

window.System.import('main').then(checkComponentsReady);
