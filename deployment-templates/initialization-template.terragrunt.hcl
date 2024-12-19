include "root" {
  path = find_in_parent_folders()
}

locals {
  repo_url = ""
}

terraform {
  source = "git::${local.repo_url}.git//iac/initialization?ref=main"
}

inputs = {
}