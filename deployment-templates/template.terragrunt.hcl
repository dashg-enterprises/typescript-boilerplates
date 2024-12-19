include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "git::${local.repo_url}.git//iac?ref=main"
}

dependency "cloudscape" {
  config_path = "../../cloudscape"
}

locals {
  application_image = ""
  repo_url = ""
  environment_name = ""
}

inputs = {
  application_image = local.application_image
  environment_name  = local.environment_name
  vpc = {
    id                 = dependency.cloudscape.outputs.vpc_id
    private_subnet_ids = dependency.cloudscape.outputs.private_subnet_ids
    public_subnet_ids  = dependency.cloudscape.outputs.public_subnet_ids
  }
}