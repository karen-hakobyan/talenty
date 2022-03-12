#!/usr/bin/env sh
set +e

docker exec -it talenty-mongo bash -c "mongo talenty --eval 'db.templates.drop()'"

docker cp system_template.js talenty-mongo:system_template.js

docker exec talenty-mongo mongo localhost/talenty system_template.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty system_template.js
done
