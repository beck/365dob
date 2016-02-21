# 365dob

## Getting started

1. Config the instagram api:

  * `cp ig/api.config.sample.cson ig/api.config.cson`
  * Add an [access token](https://api.instagram.com/oauth/authorize/?client_id=bd819b765410490f8503a4558d7a8186&redirect_uri=http://www.365daysofbabes.com&response_type=token&scope=public_content).
  * Add to the [client secret](https://www.instagram.com/developer/clients/manage/).


1. Create `public/calendar.json`:
  ```
  pip install -r ig/requirements.txt
  ig/calendar-update.py
  ```


1. Install app deps:
  ```
  npm install
  $(npm bin)/jspm install
  ```


1. Run server:
  ```
  npm install -g http-server
  http-server public
  ```
