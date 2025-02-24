# Use the official Apache image
FROM httpd:latest

# Install mod_evasive (and any required dependencies)
RUN apt-get update && \
    apt-get install -y libapache2-mod-evasive && \
    rm -rf /var/lib/apt/lists/*

# Enable mod_rewrite and configure .htaccess overrides
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/LoadModule ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copy your application build files into Apache's web root
COPY ./dist/ /usr/local/apache2/htdocs/

# Copy your custom SSL configuration
COPY ./httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf
RUN echo "Include conf/extra/httpd-ssl.conf" >> /usr/local/apache2/conf/httpd.conf

# Copy the mod_evasive configuration file into Apache's configuration directory
COPY ./mod_evasive.conf /usr/local/apache2/conf/extra/mod_evasive.conf
RUN echo "Include conf/extra/mod_evasive.conf" >> /usr/local/apache2/conf/httpd.conf

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

