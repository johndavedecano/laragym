#!/usr/bin/env groovy

node {
  def app
  try {
    stage('build') {
        checkout scm

        app = docker.build("johndavedecano/laragym")

        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }

        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml up -d'
        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml exec -T php-fpm composer install'
        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml exec -T php-fpm cp .env.example .env'
    }

    stage('test') {
        sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml exec -T php-fpm ./vendor/bin/phpunit'
    }

    stage('deploy') {
        sh '/usr/bin/rsync -avz -e ssh ${WORKSPACE} ${env.LARAGYM_SERVER}:${env.LARAGYM_SERVER_PATH}'
    }

    stage('clean') {
        sh 'docker stop $(docker ps -q) || docker rm $(docker ps -a -q) || docker rmi $(docker images -q -f dangling=true)'
    }
  } catch(error) {
      sh 'docker stop $(docker ps -q) || docker rm $(docker ps -a -q) || docker rmi $(docker images -q -f dangling=true)'
  }
}