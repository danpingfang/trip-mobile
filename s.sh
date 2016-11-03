#!/usr/bin/env bash
rm src/config.js
if [ $1 = "publish" ]; then
      cp src/config.prod.js src/config.js
    else
      cp src/config.local.js src/config.js
fi
npm run-script build

if [ $1 = "publish" ]; then
      scp -r dist/static/js root@115.159.33.205:/var/www/tripsoeasy/s/static/1.0.0
      scp -r dist/static/css root@115.159.33.205:/var/www/tripsoeasy/s/static/1.0.0
      scp -r dist/static/images root@115.159.33.205:/var/www/tripsoeasy/s/static
    else
      scp -r dist/static/css root@115.159.33.205:/var/www/tripsoeasy/s-test/static/debug
      scp -r dist/static/js root@115.159.33.205:/var/www/tripsoeasy/s-test/static/debug
      scp -r dist/static/images root@115.159.33.205:/var/www/tripsoeasy/s-test/static
fi
