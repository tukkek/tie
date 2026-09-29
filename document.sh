#!/usr/bin/bash
set -e

npm install jsdoc
./node_modules/.bin/jsdoc tie.js -d documentation/
