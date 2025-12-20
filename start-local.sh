#!/usr/bin/env bash
set -euo pipefail

# Local helper to build & run Backend (kept for local use, not used by Railpack)
if [ -d "Backend" ]; then
  cd Backend
  echo "==> Installing dependencies with npm ci"
  npm ci

  if npm run | grep -q " build"; then
    echo "==> Building the project"
    npm run build
  fi

  echo "==> Starting the Backend"
  npm run start
else
  echo "Backend directory not found. Please run from repo root." >&2
  exit 1
fi
