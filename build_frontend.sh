#!/usr/bin/env bash

set -e

echo Build started at: $(date)

echo "Prepare output folder"
rm -rf uploads/fronted
mkdir -p uploads/frontend

echo "Build scripts"
npx rollup -cm

echo "Build styles"
npx lessc --source-map src/frontend/style.less uploads/frontend/style.css

echo "Copy assets"
cp src/frontend/favicon.png uploads/frontend/favicon.png
cp -r src/frontend/fonts uploads/frontend/
cp -r src/frontend/images uploads/frontend/

echo "Copy libraries"
mkdir -p uploads/frontend/libs
cp -r node_modules/lightbox2/dist uploads/frontend/libs/lightbox
cp node_modules/underscore/underscore-min.js uploads/frontend/libs/underscore-min.js
cp node_modules/jquery/dist/jquery.min.js uploads/frontend/libs/jquery.min.js
cp node_modules/js-cookie/src/js.cookie.js uploads/frontend/libs/js.cookie.js

echo "Done"
