all:
	make release

## dev
dev:
	docker-compose -f docker-compose.dev.yml up -d --build

ddown:
	docker-compose -f docker-compose.dev.yml down
	docker system prune -a -f
	docker volume prune -a -f

## prod
release:
	docker-compose -f docker-compose.prod.yml up -d --build

clean:
	docker-compose -f docker-compose.prod.yml down
	docker system prune -a -f
	docker volume prune -a -f
