docker system prune -af && \
for image in $(docker images --format "{{.Repository}}"); do docker pull $image; done && \
docker compose -f docker-compose.yml up --force-recreate --build -d