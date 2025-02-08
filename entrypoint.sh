#!/bin/sh -l

set -e

RELEASE_ID=$1
ACCESS_TOKEN=$2
APP_FILE=$3

curl -s --fail-with-body "https://api.appdeploypro.com/releases/$RELEASE_ID" \
  -X PUT \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F binary="@$APP_FILE"
