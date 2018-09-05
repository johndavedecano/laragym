#!/usr/bin/env groovy

node {
  def app
  try {
    stage('checkout') {
      checkout scm
    }

    stage('build-docker') {
      app = docker.build("johndavedecano/laragym")
    }

    stage('Push image') {
      docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        app.push("${env.BUILD_NUMBER}")
        app.push("latest")
      }
    }

  } catch(error) {
      throw error
  } finally {

  }
}