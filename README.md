# 365 Days of Babes

A calendar project.

This is the source for:  
http://www.365daysofbabes.com/

To join in, take a picture every day of your babe. Tag it with both
`#365dob` and today's day number, eg `#day21`.

Original idea by [pawsnopaws](https://www.instagram.com/pawsnopaws/).


## Development

1. Config the instagram api:

  * `cp ig/api.config.sample.cson ig/api.config.cson`
  * Add an [access token](https://api.instagram.com/oauth/authorize/?client_id=bd819b765410490f8503a4558d7a8186&redirect_uri=http://www.365daysofbabes.com&response_type=token&scope=public_content).
  * Add the [client secret](https://www.instagram.com/developer/clients/manage/).


1. Create `public/calendar.json`:
  ```
  curl http://www.365daysofbabes.com/calendar.json -o public/calendar.json
  ```

1. Install app deps:
  ```
  npm install -g jspm
  npm install -g jspm-bower-endpoint
  jspm registry create bower jspm-bower-endpoint
  jspm install
  ```


1. Run server:
  ```
  npm install -g http-server
  http-server public
  ```

1. Live reload:
  ```
  npm install -g livereload
  livereload public
  ```

## Build

Knockout all the systemjs. Replace local libs with public cdn.

1. (optional) Install deps locally:
  ```
  npm install
  npm install jspm
  npm install jspm-bower-endpoint
  $(npm bin)/jspm registry create bower jspm-bower-endpoint
  $(npm bin)/jspm install
  ```

1. Run `./build.js`

1. Verify `http-server build`
