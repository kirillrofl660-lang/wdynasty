#!/usr/bin/env bash
set -e

# === Deploy script for GHCR ===
# Usage: ./deploy.sh
# Requires: docker, docker compose, .env with GHCR_IMAGE

echo "=== Web Dynasty Deploy ==="

# Проверяем наличие .env
if [ ! -f .env ]; then
  echo "Error: .env not found. Copy .env.example and fill it."
  exit 1
fi

# Загружаем переменные
set -a
source .env
set +a

# Логин в GHCR (требуется GITHUB_TOKEN или личный PAT)
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Warning: GITHUB_TOKEN not set. If image is private, run:"
  echo "  echo YOUR_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
fi

# Пулл свежего образа
echo "Pulling image: $GHCR_IMAGE"
docker compose -f docker-compose.prod.yml pull

# Перезапуск
echo "Restarting containers..."
docker compose -f docker-compose.prod.yml up -d

# Cleanup
echo "Cleaning up old images..."
docker image prune -f

echo "=== Done ==="
docker compose -f docker-compose.prod.yml ps
