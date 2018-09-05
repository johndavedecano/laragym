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
      sh 'docker-compose up -d -f docker-compose.testing.yml'
    }
  } catch(error) {
      throw error
  } finally {

  }
}