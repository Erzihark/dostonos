# Start services in background
up:
	docker compose up -d

start:
	docker compose start

# Stop services
down:
	docker compose down

stop:
	docker compose stop

# Show logs
logs:
	docker compose logs -f

# Rebuild containers (use after changing docker-compose.yml)
rebuild:
	docker compose down -v
	docker compose up -d --build
