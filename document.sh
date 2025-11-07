#!/usr/bin/bash
set -e

npm install jsdoc #requires a package.json
./node_modules/.bin/jsdoc tie.js -d documentation/
