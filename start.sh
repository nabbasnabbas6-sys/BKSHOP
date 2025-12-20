#!/usr/bin/env bash
set -euo pipefail

# Root start script for Railpack: build & run the Backend service
if [ -d "Backend" ]; then
  cd Backend
  echo "==> Running in Backend directory"

  if [ -f package-lock.json ]; then
    echo "==> Installing dependencies with npm ci"
    npm ci --silent
  elif [ -f pnpm-lock.yaml ]; then
    echo "==> Installing dependencies with pnpm"
    pnpm install --frozen-lockfile || npm install --silent
  elif [ -f yarn.lock ]; then
    echo "==> Installing dependencies with npm (yarn detected)"
    npm install --silent
  else
    echo "==> No lockfile found, running npm install"
    npm install --silent
  fi

  # Build if a build script exists
  if npm run | grep -q " build"; then
    echo "==> Building the project"
    npm run build
  fi

  echo "==> Starting the Backend"
  npm run start
else
  echo "Backend directory not found. Please adjust start.sh to point to your service." >&2
  exit 1
fi
