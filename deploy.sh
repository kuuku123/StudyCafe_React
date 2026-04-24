#!/bin/bash

set -euo pipefail

APP_NAME="react-apache"
IMAGE_NAME="react-apache-app"
DOCKERHUB_REPO="kuuku123/react-apache-app"
PORT=3000

echo "=== Starting deployment ==="

# Step 0: Remove existing container if it exists
if docker ps -a --format '{{.Names}}' | grep -Eq "^${APP_NAME}\$"; then
  echo "Found existing container. Removing..."
  docker stop "${APP_NAME}" || true
  docker rm "${APP_NAME}" || true
fi

# Step 1: Build React app
echo "Cleaning old build artifacts..."
npm run clean
echo "Installing dependencies..."
npm install
echo "Building React app..."
npm run build

# Step 2: Build Docker image (portable across architectures)
echo "Building Docker image..."
docker build -t "${IMAGE_NAME}:latest" .

# Step 3: Tag Docker image
echo "Tagging Docker image..."
docker tag "${IMAGE_NAME}:latest" "${DOCKERHUB_REPO}:latest"

# Step 4: Push to Docker Hub (best-effort)
echo "Checking Docker login status..."
if docker system info 2>/dev/null | grep -q "Username"; then
  echo "Pushing image to Docker Hub..."
  docker push "${DOCKERHUB_REPO}:latest" || {
    echo "Warning: Failed to push image."
  }
else
  echo "Not logged in. Skipping push."
fi

# Step 5: Run container
echo "Starting container on port ${PORT}..."

if lsof -i :${PORT} >/dev/null 2>&1; then
  echo "Error: Port ${PORT} is already in use."
  exit 1
fi

docker run -d \
  -p ${PORT}:80 \
  --name "${APP_NAME}" \
  "${IMAGE_NAME}:latest"

echo "=== Deployment completed ==="
echo "App running at: http://localhost:${PORT}"
