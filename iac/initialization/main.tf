locals {  # need to get this from same place as bounded-context
  bounded_context_name = "ExampleContext"
}

module "fargate_bounded_context_initialization" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/initialization?ref=main"
  bounded_context_name = local.bounded_context_name
}