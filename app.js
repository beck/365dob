/*jshint globalstrict: true*/
'use strict';

var Instafeed = require('instafeed.js');
var token = {};

var parseFragment = function() {
  var params = {};
  var e,
    a = /\+/g,  // Regex for replacing addition symbol with a space
    r = /([^&;=]+)=?([^&;]*)/g,
    d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
    q = window.location.hash.substring(1);

  e = r.exec(q);
  while (e) {
    params[d(e[1])] = d(e[2]);
    e = r.exec(q);
  }
  return params;
};

token.get = function() {
  return this.getFromFragment() || this.showGetTokenButton();
};

token.getFromFragment = function() {
  var params = parseFragment();
  return params.access_token;
};

token.showGetTokenButton = function() {
  var link = document.getElementById('gettoken');
  var wrap = document.getElementById('gettoken-wrap');
  var clientid = 'bd819b765410490f8503a4558d7a8186';
  var redirect = 'http://365dob.dev:8080';
  var authurl = 'https://api.instagram.com/oauth/authorize/' +
    '?client_id=' + clientid +
    '&redirect_uri=' + redirect +
    '&response_type=token' +
    '&scope=public_content';
  wrap.className = '';
  link.href = authurl;
};

(function() {

  var accessToken = token.get();
  var loadButton = document.getElementById('load-more');
  var loadWrap = document.getElementById('load-more-wrap');
  if (!accessToken) {
    return;
  }
  var feed = new Instafeed({
    after: function() {
      if (this.hasNext()) {
        loadWrap.className = '';
      } else {
        loadWrap.className = 'hide';
      }
    },
    get: 'tagged',
    tagName: '365dob',
    accessToken: accessToken,
    scope: 'public_content',
  });

  feed.run();

  loadButton.addEventListener('click', function() {
    feed.next();
  });

})();
