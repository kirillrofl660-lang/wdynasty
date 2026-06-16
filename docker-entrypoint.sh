#!/usr/bin/env sh
set -e

# Ensure data directory exists
mkdir -p /app/data
mkdir -p /app/media

# Run seed script if seed marker doesn't exist
if [ ! -f /app/data/.seeded ]; then
  echo "Running seed..."
  npx tsx scripts/seed.ts || echo "Seed skipped (db may already have data)"
  touch /app/data/.seeded
fi

# Start the application
exec node server.js
