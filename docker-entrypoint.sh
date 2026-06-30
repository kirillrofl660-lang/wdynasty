#!/usr/bin/env sh
set -e

# Ensure media/data directories exist
mkdir -p /app/data /app/media

TOKEN="${REVALIDATE_SITEMAP_TOKEN:-change-me}"
PORT="${PORT:-3000}"
HOST="localhost"

# Function to wait for Next.js to be ready
wait_for_server() {
  echo "Waiting for server at http://${HOST}:${PORT}..."
  while true; do
    if node -e "require('http').get('http://${HOST}:${PORT}/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" 2>/dev/null; then
      echo "Server is ready"
      return
    fi
    sleep 1
  done
}

# Function to revalidate sitemap via API
revalidate_sitemap() {
  echo "Revalidating sitemap..."
  node -e "
    const http = require('http');
    const options = {
      hostname: '${HOST}',
      port: ${PORT},
      path: '/api/revalidate-sitemap',
      headers: { 'x-revalidate-token': '${TOKEN}' }
    };
    const req = http.get(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log('Sitemap revalidate:', res.statusCode, data);
        process.exit(res.statusCode === 200 ? 0 : 1);
      });
    });
    req.on('error', (e) => { console.error('Sitemap revalidate error:', e.message); process.exit(1); });
  "
}

# Start Next.js in background
node server.js &
SERVER_PID=$!

# Wait for it to be ready
wait_for_server

# Initial sitemap generation
revalidate_sitemap

# Periodic revalidation every 12 hours
(
  while true; do
    sleep 43200
    revalidate_sitemap
  done
) &

# Keep the server process in foreground
wait $SERVER_PID
