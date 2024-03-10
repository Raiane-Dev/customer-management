all:
	make prelease

## dev
drelease:
	docker-compose -f docker-compose.dev.yml up -d --build

ddown:
	docker-compose -f docker-compose.dev.yml down
	docker system prune -a -f
	docker volume prune -a -f

## prod
prelease:
	docker-compose -f docker-compose.prod.yml up -d --build

pdown:
	docker-compose -f docker-compose.prod.yml down
	docker system prune -a -f
	docker volume prune -a -f
