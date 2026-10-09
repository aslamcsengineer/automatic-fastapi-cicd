pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'FastAPI source code downloaded from GitHub'
            }
        }

        stage('Verify Source') {
            steps {
                sh 'ls -la'
                sh 'test -f main.py'
                sh 'test -f requirements.txt'
                sh 'test -f test_main.py'
                echo 'FastAPI project files verified'
            }
        }
    }

    post {
        success {
            echo 'GitHub checkout and source verification succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check console output.'
        }
    }
}