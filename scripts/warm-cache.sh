#!/usr/bin/env bash
set -euo pipefail

HOST="${HOST:-https://wdynasty.ru}"
TOKEN="${REVALIDATE_TOKEN:-}"

if [ -z "$TOKEN" ]; then
  echo "Set REVALIDATE_TOKEN env var"
  exit 1
fi

echo "Warming cache at $HOST ..."

ENDPOINT="$HOST/api/revalidate"
PAYLOAD=$(cat <<EOF
{
  "token": "$TOKEN",
  "paths": ["/", "/uslugi", "/cases", "/team", "/blog"]
}
EOF
)

if curl -fsS -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "$PAYLOAD" >/dev/null; then
  echo "Revalidation triggered."
else
  echo "Revalidation failed."
  exit 1
fi

for path in / /uslugi /cases /team /blog; do
  echo "Warming $path"
  curl -fsS -o /dev/null "$HOST$path" || true
  sleep 2
done

echo "Done."
