terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0" # This ensures you get a 3.x version, which is currently standard
    }
  }
}
provider "docker" {
  # This tells Terraform to use the host's Docker engine mapped to Jenkins
  host = "unix:///var/run/docker.sock"
}

resource "docker_image" "hello_world" {
  name = "hello-microservice-api:latest"
}

resource "docker_container" "hello_world_container" {
  image = docker_image.hello_world.image_id
  name  = "local-test-app"
  ports {
    internal = 5000
    external = 5000
  }
}