#!/bin/bash

ember build --environment=production
bucket="s3://steam-library"
#node_modules/ember-cli/bin/ember build --environment=production

SYNC="aws s3 sync dist $bucket $AWS"

echo "* assets except .css, .js and .html"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*.html' --exclude '*.css' --exclude '*.js' --exclude 'build.txt'
echo
echo "* css"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*' --include '*.css' --content-type text/css
echo
echo "* js"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*' --include '*.js' --content-type application/js
echo
echo "* html"
$SYNC --acl public-read --cache-control 'no-cache' --exclude '*' --include '*.html' --include 'build.txt'
