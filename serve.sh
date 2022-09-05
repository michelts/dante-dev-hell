#!/bin/sh

PORT=$1

if [ -z "$PORT" ]; then
  PORT=8080
fi

python3 -m http.server --directory dist/ $PORT
