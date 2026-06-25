module "vpc" {
  source = "git::https://github.com/KKAR2023/terraform-modules.git//vpc"

  vpc_cidr = var.vpc_cidr
  vpc_name = "dev-vpc"
}

module "security_group" {
  source = "git::https://github.com/KKAR2023/terraform-modules.git//security-group"

  vpc_id  = module.vpc.vpc_id
  sg_name = "dev-sg"
}