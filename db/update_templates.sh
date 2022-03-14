#!/usr/bin/env sh
set +e

docker cp templates_data.js talenty-mongo:templates_data.js

docker exec talenty-mongo mongo localhost/talenty templates_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty templates_data.js
done