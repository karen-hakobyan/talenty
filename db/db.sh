#!/usr/bin/env sh
set +e

docker stop talenty-db
docker rm talenty-db

docker run -d \
  -p 27777:27017 \
  --name talenty-db \
  -v mongodbdata:/data/db \
  mongo

docker cp announcements_data.js talenty-db:announcements_data.js

docker exec talenty-db mongo localhost/talenty announcements_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-db mongo localhost/talenty announcements_data.js
done

docker cp cv_templates_data.js talenty-db:cv_templates_data.js

docker exec talenty-db mongo localhost/talenty cv_templates_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-db mongo localhost/talenty cv_templates_data.js
done