variable "application_image" {
  description = "Docker image to run in the ECS cluster"
}

variable "environment_name" {
  description = "Name of the deployment environment."
  type        = string
}

variable "vpc" {
    description = "The VPC for this bounded context"
    type = object({
        id = string
        private_subnet_ids = list(string)
        public_subnet_ids = list(string)
  })
}