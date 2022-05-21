#!/usr/bin/env sh
set +e

docker cp announcements_data.js talenty-mongo:announcements_data.js

docker exec talenty-mongo mongo localhost/talenty announcements_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty announcements_data.js
done

docker cp clear_user_job_announcement_data.js talenty-mongo:clear_user_job_announcement_data.js

docker exec talenty-mongo mongo localhost/talenty clear_user_job_announcement_data.js