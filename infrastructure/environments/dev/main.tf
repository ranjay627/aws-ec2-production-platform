module "vpc" {
  source = "../../modules/vpc"

  project_name = var.project_name
  environment  = var.environment

  vpc_cidr = var.vpc_cidr

  public_subnet_cidrs      = var.public_subnet_cidrs
  private_app_subnet_cidrs = var.private_app_subnet_cidrs
  database_subnet_cidrs    = var.database_subnet_cidrs
}

module "security_groups" {
  source = "../../modules/security-groups"

  project_name = var.project_name
  environment  = var.environment

  vpc_id = module.vpc.vpc_id
}

module "iam" {
  source = "../../modules/iam"

  project_name = var.project_name
  environment  = var.environment

  spring_boot_api_repository_arn = module.spring_boot_api_ecr.repository_arn
  nextjs_web_repository_arn      = module.nextjs_web_ecr.repository_arn
}

module "spring_boot_api_ecr" {
  source = "../../modules/ecr"

  project_name     = var.project_name
  environment      = var.environment
  application_name = "spring-boot-api"
}

module "nextjs_web_ecr" {
  source = "../../modules/ecr"

  project_name     = var.project_name
  environment      = var.environment
  application_name = "nextjs-web"
}