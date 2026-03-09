provider "google" {
  project = "mock-microservice"
  region  = "europe-west2"
}

variable "image_url" {
  description = "The Docker image URL passed from the Jenkins pipeline"
  type        = string
}


resource "google_cloud_run_v2_service" "default" {
  name     = "hello-world-service"
  location = "europe-west2"
  template {
    containers {
      image = var.image_url
    }
  }
}