terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

module "fargate_bounded_context_initialization" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//src/modules/bounded-context/aws/initialization?ref=main"
  bounded_context_name = "ExampleContext" # need to get this from same place as bounded-context
}