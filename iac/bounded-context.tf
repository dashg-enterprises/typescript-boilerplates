locals { // get these as imports to construct DDD API
  aggregate_root_name  = "Example"
  bounded_context_name = "ExampleContext"
  application_name     = "ExampleService"
  application_image    = var.application_image
  vpc = var.vpc
}

# generating a first-class id in Terraform would 
# allow this context to be linked to its initialization
# or vice-versa.
module "fargate_bounded_context" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/cluster?ref=main"
  aggregate_root_name = local.aggregate_root_name
  bounded_context_name = local.bounded_context_name
  application_name = "${local.application_name}-${var.environment_name}"
  application_image = local.application_image
  vpc = local.vpc
  with_sql = true
  public = false
}

output "lb_arn" {
  value = module.fargate_bounded_context.lb_arn
}

output "lb_dns_name" {
  value = module.fargate_bounded_context.lb_dns_name
}