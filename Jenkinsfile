#!/usr/bin/env groovy

node {
  try {
    stage('build') {
      checkout scm

      sh "composer install"
      sh "cp .env.example .env"
      sh "php artisan key:generate"
    }

    // stage('test') {
    //     sh "./vendor/bin/phpunit"
    // }

    stage('deploy') {
      sh "echo 'WE ARE DEPLOYING'"
    }
  } catch(error) {
      throw error
  } finally {

  }
}