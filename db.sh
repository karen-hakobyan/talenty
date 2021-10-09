#!/usr/bin/env sh
set +e

docker stop talenty-postgres
docker rm talenty-postgres

docker run -d \
  -p 5435:5432 \
  -e POSTGRES_USER=talenty \
  -e POSTGRES_DB=talenty \
  -e POSTGRES_PASSWORD=talenty \
  --name talenty-postgres \
  postgres
