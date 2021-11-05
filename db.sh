#!/usr/bin/env sh
set +e

docker stop talenty-db
docker rm talenty-db

docker run -d \
  -p 27777:27017 \
  --name talenty-db \
  mongo

docker cp mongo.js talenty-db:mongo.js

docker exec talenty-db mongo localhost/talenty mongo.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-db mongo localhost/talenty mongo.js
done
