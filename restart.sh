# STOP AND CLEAN ALL DOCKER CONTAINERS
docker stop $(docker ps -q) || docker rm $(docker ps -a -q)

# RESTART ALL DOCKERS
docker-compose up -d

# LARAVEL
docker-compose exec -T php-fpm composer install
docker-compose exec -T php-fpm chmod -R ug+rwx storage
docker-compose exec -T php-fpm chmod -R ug+rwx bootstrap/cache


