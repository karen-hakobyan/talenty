#!/usr/bin/env sh
set +e

docker stop talenty-mongo
docker rm talenty-mongo

docker run -d \
  -p 27777:27017 \
  --name talenty-mongo \
  mongo

docker cp announcements_data.js talenty-mongo:announcements_data.js

docker exec talenty-mongo mongo localhost/talenty announcements_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty announcements_data.js
done

docker cp cv_templates_data.js talenty-mongo:cv_templates_data.js

docker exec talenty-mongo mongo localhost/talenty cv_templates_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty cv_templates_data.js
done