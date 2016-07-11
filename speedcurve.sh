#!/usr/bin/env bash
curl "https://api.speedcurve.com/v1/deploy" \
    -u your-api-key:$SC_TOKEN \
    --request POST \
    --data site_id=7598 \
    --data note=Build%20$TRAVIS_BUILD_NUMBER