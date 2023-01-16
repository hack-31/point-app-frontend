.PHONY: help build build-local up down logs ps test
.DEFAULT_GOAL := help

DOCKER_TAG := latest

build-up: ## Build docker image and install package and up container
	docker compose run --rm node yarn --frozen-lockfile
	docker-compose up -d

serve: ## serve with air 
	docker compose exec app air

node: ## Attach node container
	docker compose exec node sh

install: ## package install
	docker compose run --rm node yarn --frozen-lockfile

remock: ## restart mock server
	docker compose restart api

up: ## Do docker compose up with hot reload
	docker compose up -d

down: ## Do docker compose down
	docker compose down

logs: ## Tail docker compose logs
	docker compose logs -f

ps: ## Check container status
	docker compose ps

ci: ## パッケージの導入
	docker compose run --rm node yarn --frozen-lockfile

help: ## Show options
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
