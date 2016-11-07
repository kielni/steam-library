#!/bin/bash

bucket="s3://steam-library"
#node_modules/ember-cli/bin/ember build --environment=production

SYNC="aws s3 sync dist $bucket $AWS"

echo "* assets except .css, .js and .html"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*.html' --exclude '*.css' --exclude '*.js' --exclude 'build.txt'
echo
echo "* css"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*' --include '*.css' --content-encoding gzip --content-type text/css
echo
echo "* js"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*' --include '*.js' --content-encoding gzip --content-type application/js
echo
echo "* html"
$SYNC --acl public-read --cache-control 'no-cache' --exclude '*' --include '*.html' --include 'build.txt'
echo
aws s3 sync . $bucket/library.json $AWS --exclude '*' --include library.json --acl public-read --cache-control 'max-age=31536000, public' --content-encoding gzip --content-type application/json
echo "* remove old versions"
$SYNC --delete
