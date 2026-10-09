# Automated FastAPI CI/CD Pipeline Using Jenkins and Docker

## Project Overview

This project demonstrates a Continuous Integration and Continuous Deployment (CI/CD) pipeline for a Python FastAPI application using Jenkins, Docker, GitHub, and pytest.

When a developer pushes code to GitHub, Jenkins automatically detects the changes, runs automated tests, builds a Docker image, deploys the application, and verifies its health.

## Technology Stack

- **Backend:** Python, FastAPI
- **Testing:** pytest, HTTPX
- **CI/CD:** Jenkins Declarative Pipeline
- **Containerization:** Docker
- **Version Control:** Git and GitHub
- **Automation:** Jenkins SCM polling

## CI/CD Workflow

1. Developer pushes code to GitHub.
2. Jenkins detects the new commit through SCM polling.
3. Jenkins checks out the latest source code.
4. Automated pytest tests are executed.
5. If tests pass, Jenkins builds a Docker image.
6. Jenkins replaces the existing FastAPI application container.
7. A health check verifies successful deployment.
8. Jenkins reports the pipeline result.

## Application Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Application home |
| GET | `/health` | Health check |
| GET | `/items` | Retrieve items |
| POST | `/items` | Create an item |
| GET | `/docs` | Swagger API documentation |

## Automated Testing

The project includes four automated tests covering the home endpoint, health endpoint, item retrieval, and item creation.

Tests are executed by Jenkins before Docker deployment. If tests fail, the deployment stages are skipped.

## Docker Deployment

The FastAPI application runs inside a Docker container and is available locally at:

`http://localhost:8000`

Swagger documentation:

`http://localhost:8000/docs`

Jenkins dashboard:

`http://localhost:8081`

These localhost URLs are accessible only on the machine running the containers.

## Jenkins Pipeline Stages

- Checkout
- Automated Tests
- Docker Build
- Deploy FastAPI
- Health Check

## Automation Verification

The complete pipeline was tested by pushing a code change to GitHub. Jenkins detected the commit automatically, executed the pipeline, deployed the updated application, and completed successfully.

## Project Outcome

Successfully implemented and demonstrated an automated CI/CD pipeline integrating source control, automated testing, Docker image creation, application deployment, and health verification.

## Source Code

GitHub: https://github.com/aslamcsengineer/automatic-fastapi-cicd

## Note

This project uses a local Jenkins and Docker Desktop environment for educational demonstration. Production deployments require additional security, persistent infrastructure, and safer deployment strategies.