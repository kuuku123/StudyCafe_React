# Use the official Apache image from Docker Hub
FROM httpd:latest

# Copy the build files from the dist folder into Apache's web root directory
COPY ./dist/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

