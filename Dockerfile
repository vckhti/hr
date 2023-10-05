FROM php:7.3-apache
WORKDIR /var/www/html/
EXPOSE 80

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y unzip wget libaio1 libzip-dev zip libpng-dev libjpeg-dev libfreetype6-dev nano npm


# Apache additional modules
RUN a2enmod rewrite && \
    a2enmod headers

# PHP modules installtion
RUN docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr --with-freetype-dir=/usr
RUN docker-php-ext-install mysqli pdo pdo_mysql opcache zip gd

# Installing dbase php module
RUN pecl install dbase \
    && docker-php-ext-enable dbase

# Xdebug installation
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Composer installation
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Node Js installation
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt -y install nodejs

# Angular CLI installation
RUN npm install -g @angular/cli
