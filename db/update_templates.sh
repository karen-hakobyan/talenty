#!/usr/bin/env sh
set +e

docker cp cv_templates_data.js talenty-mongo:cv_templates_data.js

docker exec talenty-mongo mongo localhost/talenty cv_templates_data.js

while [ $? -ne 0 ]; do
  sleep 1
  docker exec talenty-mongo mongo localhost/talenty cv_templates_data.js
done

docker cp clear_user_cv_template_data.js talenty-mongo:clear_user_cv_template_data.js

docker exec talenty-mongo mongo localhost/talenty clear_user_cv_template_data.js