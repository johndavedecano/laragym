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
      sh 'docker ps -q -f status=exited | xargs --no-run-if-empty docker rm'
      sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml up -d'
    }
    
    stage('docker-teardown') {
      sh '/usr/local/bin/docker-compose -f docker-compose.testing.yml down'
    }
  } catch(error) {
      throw error
  } finally {

  }
}