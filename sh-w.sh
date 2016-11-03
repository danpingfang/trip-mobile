#!/usr/bin/env bash
npm run build
scp -r dist/static root@115.159.33.205:/var/www/tripsoeasy/s-test
