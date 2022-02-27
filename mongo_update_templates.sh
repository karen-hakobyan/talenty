#!/usr/bin/env sh
set +e

docker exec -it talenty-mongo bash -c "mongo talenty --eval 'db.templates.drop()'"

docker cp mongo.js talenty-mongo:mongo.js

docker exec talenty-mongo mongo localhost/talenty mongo.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty mongo.js
done
