#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Step 0: Remove the existing Docker container if it exists
if docker ps -a --format '{{.Names}}' | grep -Eq "^react-apache\$"; then
  echo "Stopping and removing existing 'react-apache' container..."
  docker stop react-apache
  docker rm react-apache
fi

# Step 1: Build the React app
echo "Building React app..."
npm run build

# Step 2: Build the Docker image
echo "Building Docker image..."
docker buildx build --platform linux/arm64 --load -t react-apache-app .

# Step 3: Tag the Docker image
echo "Tagging Docker image..."
docker tag react-apache-app:latest kuuku123/react-apache-app:latest

# Step 4: Push the Docker image to Docker Hub (if logged in)
if docker info | grep -q "Username"; then
  echo "Pushing Docker image to Docker Hub..."
  docker push kuuku123/react-apache-app:latest
else
  echo "Not logged into Docker. Skipping Docker image push."
fi

# Step 5: Run the Docker container
echo "Running Docker container..."
docker run -d -p 3000:80 --name react-apache react-apache-app

echo "Deployment completed! Your app is running at http://localhost:3000"
