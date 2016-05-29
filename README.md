# 365 Days of Babes

A calendar project.

This is the source for:  
http://www.365daysofbabes.com/

To join in, take a picture every day of your babe. Tag it with both
`#365dob` and today's day number, eg `#day21`.

Original idea by [pawsnopaws](https://www.instagram.com/pawsnopaws/).


## Development

1. Create `public/calendar.json`:
  ```
  curl http://www.365daysofbabes.com/calendar.json -o public/calendar.json
  ```

1. Install app deps:
  ```
  npm install
  npm install -g jspm
  npm install -g jspm-bower-endpoint
  jspm registry create bower jspm-bower-endpoint
  jspm install
  ```


1. Run server:
  ```
  npm install -g http-server
  npm start
  ```

1. Live reload:
  ```
  npm install -g livereload
  npm run watch
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

1. Build: `npm run build`

1. Verify: `npm run start-build`
