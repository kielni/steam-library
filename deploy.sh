#!/bin/bash

ember build --environment=production
bucket="s3://steam-library"

SYNC="aws s3 sync dist $bucket $AWS"

echo "* assets except .css, .js and .html"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*.html' --exclude '*.css' --exclude '*.js' --exclude 'build.txt' --profile megapis
echo
echo "* css"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*' --include '*.css' --content-encoding gzip --content-type text/css --profile megapis
echo
echo "* js"
$SYNC --acl public-read --cache-control 'max-age=31536000, public' --exclude '*' --include '*.js' --content-encoding gzip --content-type application/js --profile megapis
echo
echo "* html"
$SYNC --acl public-read --cache-control 'no-cache' --exclude '*' --include '*.html' --include 'build.txt' --profile megapis
