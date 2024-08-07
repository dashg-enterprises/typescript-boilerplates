terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

# module "lambda_module_js" {
#   source = "../../../modules/bounded-context/aws/serverless"

#   application_name     = "MyFirstBoundedContext-${var.environment}"
#   aggregate_root_name  = "Print"
#   bounded_context_name = "PrintContext"
#   source_code_file     = "index.js"
#   source_code_folder   = "../../../applications/node"
#   environment          = var.environment

#   tags = {
#     Terraform   = "true"
#     Environment = var.environment
#   }
# }

# module "lambda_module_py" {
#   source = "../../../modules/bounded-context/aws/serverless"

#   application_name     = "MySecondBoundedContext-${var.environment}"
#   aggregate_root_name  = "Order"
#   bounded_context_name = "OrderContext"
#   source_code_file     = "index.py"
#   source_code_folder   = "../../../applications/python"
#   environment          = var.environment

#   tags = {
#     Terraform   = "true"
#     Environment = var.environment
#   }
# }

locals { // get these as imports to construct DDD API
  test_bounded_context = {
    aggregate_root_name  = "Example"
    bounded_context_name = "ExampleContext"
    application_name     = "ExampleService-${var.environment}"
    application_image    = var.application_image
    vpc = var.vpc
  }
}

# generating a first-class id in Terraform would 
# allow this context to be linked to its initialization
# or vice-versa.
module "fargate_bounded_context" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/cluster?ref=main"
  aggregate_root_name = local.test_bounded_context.aggregate_root_name
  bounded_context_name = local.test_bounded_context.bounded_context_name
  application_name = local.test_bounded_context.application_name
  application_image = local.test_bounded_context.application_image
  vpc = local.test_bounded_context.vpc
}