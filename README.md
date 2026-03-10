# MicroServiceMock

Creating a microservice app. This project is a simple Node.js microservice built with the Express framework and optimized for deployment on GCP Cloud Run.

## Features

* **Express API:** Powered by `express` to handle routing.
* **Health Checks:** Includes a dedicated `/health` endpoint, which is a best practice for Cloud deployments.
* **Production-Ready Dockerfile:** Utilizes a lightweight Alpine base image, leverages Docker layer caching, and runs securely as a non-root user.
* **Infrastructure as Code (IaC):** Utilizes Terraform for both local testing and Google Cloud Platform (GCP) deployment provisioning.
* **CI/CD Pipelines:** Automated build and deployment workflows configured via Jenkins.

## Endpoints

The server exposes the following routes:

* `GET /`: Returns a "Hello World from GCP Cloud Run!" JSON response containing the current environment and a timestamp.
* `GET /health`: Returns a `200` status with a JSON object indicating the service is "Healthy", the service name, and the current process uptime.

## Local Development

1. Install dependencies:
   ```bash
   npm install


node app.js

## Infrastructure as Code (Terraform)
This project uses Terraform to manage deployments in different environments:

## Local Environment (terraform/local): 
Uses the kreuzwerker/docker provider to spin up a local Docker container named local-test-app using the hello-microservice-api:latest image. It maps internal container port 5000 to external port 5000.

## GCP Environment (terraform/gcp): 
Uses the google provider to provision a Google Cloud Run v2 service named hello-world-service in the europe-west2 region within the mock-microservice project. It accepts an image_url variable to deploy the exact Docker image built by Jenkins.

## CI/CD Pipelines (Jenkins)
The project includes two separate Jenkins pipelines for automated deployments:

1. Local Pipeline (local.jenkinsfile)
Designed for local testing, this pipeline performs the following steps:

Builds the Docker image hello-microservice-api:latest using the local Docker daemon.

Deploys the infrastructure locally via Terraform (terraform init and terraform apply -auto-approve).

Verifies the deployment by querying the /health endpoint at http://host.docker.internal:5000/health.

2. GCP Pipeline (gcp.jenkinsfile)
Designed for production deployments to Google Cloud Platform, this pipeline waits for a GitHub push event to trigger. It performs the following steps:

Builds the Docker image with the respective Jenkins build number.

Authenticates with GCP via a service account and pushes the newly built image to the GCP Artifact Registry (europe-west2-docker.pkg.dev).

Deploys the Cloud Run service automatically by passing the pushed image URL to the GCP Terraform configuration.