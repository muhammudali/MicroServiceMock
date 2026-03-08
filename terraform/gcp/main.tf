provider "google" {
  project = "Mock-MicroService"
  region  = "europe-west2"
}

resource "google_artifact_registry_repository" "my-repo" {
  location      = "europe-west2"
  repository_id = "microservices"
  format        = "DOCKER"
}

resource "google_cloud_run_v2_service" "default" {
  name     = "hello-world-service"
  location = "europe-west2"
  template {
    containers {
      image = "europe-west2-docker.pkg.dev/Mock-MicroService/microservices/hello-microservice-api:latest"
    }
  }
}