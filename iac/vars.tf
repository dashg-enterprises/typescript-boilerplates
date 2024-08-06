variable "application_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "624626124579.dkr.ecr.us-east-1.amazonaws.com/reimagined-train:healthcheck"
}

variable "environment" {
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