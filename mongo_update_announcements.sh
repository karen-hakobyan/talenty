#!/usr/bin/env sh
set +e

docker exec -it talenty-mongo bash -c "mongo talenty --eval 'db.job_announcement.drop()'"

docker cp system_job_announcement.js talenty-mongo:system_job_announcement.js

docker exec talenty-mongo mongo localhost/talenty system_job_announcement.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty system_job_announcement.js
done
