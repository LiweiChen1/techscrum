pipeline {
  agent {
    node {
      label 'worker mode'
    }

  }
  stages {
    stage('Build') {
      steps {
        git(url: 'https://github.com/ausyncau/devops_techscrum_fe', branch: 'devops/yuri')
        yarn 'yarn run build'
      }
    }

  }
}