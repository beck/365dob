# 365 Days of Babes

A 2016 calendar project.

This is the source for:  
http://www.365daysofbabes.com/

Original idea by [pawsnopaws](https://www.instagram.com/pawsnopaws/).


## Development

1. Create `public/calendar.json`:
  ```
  curl http://www.365daysofbabes.com/calendar.json -o public/calendar.json
  ```

1. Install app deps:
  ```
  npm install
  # with ./node_modules/bin on PATH
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

The build knocks out all the systemjs and replaces local libs with public cdn.

1. Build: `npm run build`

1. Verify: `http-server build`
