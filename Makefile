# Makefile for Next.js Docker Project
# Provides convenient commands for development and deployment

.PHONY: help dev build up down logs clean test deploy

# Default target
.DEFAULT_GOAL := help

# Variables
DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_DEV := docker-compose -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD := docker-compose -f docker-compose.yml

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development commands
dev: ## Start development environment
	@echo "🚀 Starting development environment..."
	$(DOCKER_COMPOSE_DEV) up

dev-build: ## Build and start development environment
	@echo "🏗️ Building development environment..."
	$(DOCKER_COMPOSE_DEV) up --build

dev-down: ## Stop development environment
	@echo "🛑 Stopping development environment..."
	$(DOCKER_COMPOSE_DEV) down

# Production commands
build: ## Build production Docker image
	@echo "🏗️ Building production Docker image..."
	$(DOCKER_COMPOSE_PROD) build

up: ## Start production services
	@echo "🚀 Starting production services..."
	$(DOCKER_COMPOSE_PROD) up -d

down: ## Stop production services
	@echo "🛑 Stopping production services..."
	$(DOCKER_COMPOSE_PROD) down

restart: ## Restart production services
	@echo "🔄 Restarting production services..."
	$(DOCKER_COMPOSE_PROD) restart

# Monitoring commands
logs: ## View logs from all services
	@echo "📋 Viewing logs..."
	$(DOCKER_COMPOSE_PROD) logs -f

logs-app: ## View logs from Next.js app
	@echo "📋 Viewing Next.js app logs..."
	$(DOCKER_COMPOSE_PROD) logs -f nextjs-app

ps: ## Show running containers
	@echo "📊 Container status:"
	$(DOCKER_COMPOSE_PROD) ps

health: ## Check health of services
	@echo "🏥 Checking service health..."
	@curl -f http://localhost:3000/api/health && echo "✅ Next.js is healthy" || echo "❌ Next.js is unhealthy"

# Maintenance commands
clean: ## Remove all containers, volumes, and images
	@echo "🧹 Cleaning up Docker resources..."
	$(DOCKER_COMPOSE_PROD) down -v --rmi all
	$(DOCKER_COMPOSE_DEV) down -v --rmi all
	docker system prune -f

clean-cache: ## Clean Docker build cache
	@echo "🧹 Cleaning Docker build cache..."
	docker builder prune -af

clean-volumes: ## Remove all volumes
	@echo "🧹 Removing volumes..."
	$(DOCKER_COMPOSE_PROD) down -v

# Testing commands
test: ## Run tests
	@echo "🧪 Running tests..."
	yarn test

lint: ## Run linting
	@echo "🔍 Running linting..."
	yarn lint

type-check: ## Run TypeScript type checking
	@echo "🔍 Running type check..."
	yarn check-types

format-check: ## Check code formatting
	@echo "🔍 Checking code formatting..."
	yarn check-format

format: ## Format code
	@echo "✨ Formatting code..."
	yarn format

test-all: ## Run all tests (lint, type-check, format-check, build)
	@echo "🧪 Running all tests..."
	yarn test-all

# Deployment commands
deploy: build up ## Build and deploy to production
	@echo "✅ Deployment complete!"
	@make health

deploy-quick: ## Quick deploy (pull and restart)
	@echo "🚀 Quick deploying..."
	$(DOCKER_COMPOSE_PROD) pull
	$(DOCKER_COMPOSE_PROD) up -d
	@make health

# Utility commands
shell-app: ## Open shell in Next.js container
	@echo "🐚 Opening shell in Next.js container..."
	docker exec -it nextjs-app sh

backup: ## Backup important data
	@echo "💾 Creating backup..."
	@mkdir -p backups
	@tar -czf backups/backup-$$(date +%Y%m%d-%H%M%S).tar.gz .env docker-compose.yml

install: ## Install dependencies locally
	@echo "📦 Installing dependencies..."
	yarn install

update: ## Update dependencies
	@echo "⬆️ Updating dependencies..."
	yarn upgrade-interactive

# Docker BuildKit commands
buildx-setup: ## Setup Docker BuildKit
	@echo "🔧 Setting up Docker BuildKit..."
	docker buildx create --name nextjs-builder --use || true
	docker buildx inspect --bootstrap

buildx-build: ## Build with BuildKit and cache
	@echo "🏗️ Building with BuildKit..."
	docker buildx build \
		--platform linux/amd64,linux/arm64 \
		--cache-from type=registry,ref=nextjs-app:buildcache \
		--cache-to type=registry,ref=nextjs-app:buildcache,mode=max \
		-t nextjs-app:latest \
		--load \
		.

# Information commands
info: ## Show project information
	@echo "📊 Project Information:"
	@echo "  Node version: $$(node --version)"
	@echo "  Yarn version: $$(yarn --version)"
	@echo "  Docker version: $$(docker --version)"
	@echo "  Docker Compose version: $$(docker-compose --version)"
	@echo ""
	@echo "📦 Project dependencies:"
	@yarn list --depth=0 2>/dev/null | head -20

env-example: ## Create .env from .env.example
	@echo "📝 Creating .env file..."
	@cp .env.example .env
	@echo "✅ .env file created. Please update it with your configuration."
