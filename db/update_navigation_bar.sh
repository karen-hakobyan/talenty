#!/usr/bin/env sh
set +e

docker cp navigation_bar_data.js talenty-mongo:navigation_bar_data.js

docker exec talenty-mongo mongo localhost/talenty navigation_bar_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty navigation_bar_data.js
done