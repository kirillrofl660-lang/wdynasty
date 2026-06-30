#!/usr/bin/env sh
set -e

# Generate sitemap on startup and then every 12 hours
generate_loop() {
  while true; do
    npx tsx scripts/generate-sitemap.ts
    sleep 43200
  done
}

# Run once immediately, then start background loop
npx tsx scripts/generate-sitemap.ts
generate_loop &
