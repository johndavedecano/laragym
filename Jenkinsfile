#!/usr/bin/env groovy

node {
  def app
  try {
    stage('checkout') {
      checkout scm
    }

    stage('docker-build') {
      app = docker.build("johndavedecano/laragym")
    }

    stage('docker-push') {
      docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        app.push("${env.BUILD_NUMBER}")
        app.push("latest")
      }
    }

    stage('docker-compose') {
        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml up -d'
        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml exec -it php-fpm cd /var/www/laravel && composer install'
    }

    stage('phpunit') {
        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml exec -it php-fpm cd /var/www/laravel && ./vendor/bin/phpunit'
    }

    stage('docker-cleanup') {
        sh 'docker stop $(docker ps -q) || docker rm $(docker ps -a -q) || docker rmi $(docker images -q -f dangling=true)'
    }
  } catch(error) {
      sh 'docker stop $(docker ps -q) || docker rm $(docker ps -a -q) || docker rmi $(docker images -q -f dangling=true)'
  }
}