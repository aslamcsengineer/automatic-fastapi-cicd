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
                sh 'test -f main.py'
                sh 'test -f requirements.txt'
                sh 'test -f test_main.py'
                echo 'FastAPI project files verified'
            }
        }

        stage('Automated Tests') {
            steps {
                sh '''
                    python3 -m venv .venv
                    .venv/bin/python -m pip install -r requirements.txt
                    .venv/bin/python -m pytest -v
                '''
            }
        }
    }

    post {
        success {
            echo 'FastAPI automated CI tests passed!'
        }
        failure {
            echo 'Pipeline failed. Check console output.'
        }
    }
}