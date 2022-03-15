#!/usr/bin/env sh
set +e

docker cp clear_user_template_data.js talenty-db:clear_user_template_data.js

docker exec talenty-db mongo localhost/talenty clear_user_template_data.js