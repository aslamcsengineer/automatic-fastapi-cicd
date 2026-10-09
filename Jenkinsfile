pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code downloaded from GitHub'
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

        stage('Docker Build') {
            steps {
                sh 'docker build -t automatic-fastapi:latest .'
            }
        }

        stage('Deploy FastAPI') {
            steps {
                sh '''
                    docker rm -f automatic-fastapi-app || true

                    docker run -d \
                      --name automatic-fastapi-app \
                      -p 127.0.0.1:8000:8000 \
                      automatic-fastapi:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    for i in 1 2 3 4 5 6 7 8 9 10; do
                        if docker exec automatic-fastapi-app \
                            python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=2)"; then
                            echo "FastAPI health check passed"
                            exit 0
                        fi
                        sleep 2
                    done

                    echo "FastAPI health check failed"
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'FastAPI CI/CD pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check console output.'
        }
    }
}