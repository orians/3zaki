#!/bin/bash
# Usage: ./sync.sh [backend|storefront|all]
set -e

TARGET=${1:-all}
SERVER="orians@192.168.88.10"
REMOTE_DIR="/home/orians/apps/3zaki"
RSYNC_OPTS=(-az --delete
  --exclude='node_modules/'
  --exclude='.next/'
  --exclude='dist/'
  --exclude='.env*'
)

if [ "$TARGET" = "backend" ] || [ "$TARGET" = "all" ]; then
  echo "→ Syncing backend..."
  rsync "${RSYNC_OPTS[@]}" app/ "$SERVER:$REMOTE_DIR/backend/"
fi

if [ "$TARGET" = "storefront" ] || [ "$TARGET" = "all" ]; then
  echo "→ Syncing storefront..."
  rsync "${RSYNC_OPTS[@]}" app-storefront/ "$SERVER:$REMOTE_DIR/storefront/"
fi

echo "→ Rebuilding on server..."
if [ "$TARGET" = "all" ]; then
  ssh "$SERVER" "cd $REMOTE_DIR && docker compose up -d --build"
else
  ssh "$SERVER" "cd $REMOTE_DIR && docker compose up -d --build $TARGET"
fi

echo "✓ Done."
