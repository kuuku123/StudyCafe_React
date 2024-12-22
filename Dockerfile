# Use the official Apache image
FROM httpd:latest

# Enable mod_rewrite by copying a custom configuration
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Configure Apache to allow .htaccess overrides
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Copy the build files to Apache's web root directory
COPY ./dist/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

