.PHONY: install build types test lint publish

DOCKER_COMPOSE_RUN_OPTIONS=--rm

ifeq (${CI},true)
	DOCKER_COMPOSE_RUN_OPTIONS=--rm --user root -T
endif

install:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm install

build:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run build

types:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run types

test:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm test

lint:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run lint

publish:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm publish --access public
