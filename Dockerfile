# Use the official Apache image
FROM httpd:latest

# Enable mod_rewrite and configure .htaccess overrides
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/LoadModule ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copy your application build files into Apache's web root
COPY ./dist/ /usr/local/apache2/htdocs/

# Copy your custom SSL configuration
COPY ./httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf
RUN echo "Include conf/extra/httpd-ssl.conf" >> /usr/local/apache2/conf/httpd.conf

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

